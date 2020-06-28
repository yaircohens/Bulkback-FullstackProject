const _=require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url'); // Included in NodeJS

const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');

const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const _recipients = recipients.split(',').map( email => { return {email: email.trim()} } );

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: _recipients,
            numOfRecipients: _recipients.length,
            _user: req.user.id,
            dateSent: Date.now()
        });

        try{
            const mailer = new Mailer(survey, surveyTemplate(survey));
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }

    });

    app.get('/api/surveys', requireLogin, async (req, res) => {
        surveysByUser = await Survey.find({ _user: req.user.id })
        .select('-recipients'); //{ recipients: false }

        res.send(surveysByUser);
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice'); //Path parser lib helper
        // the new object will extract from pathname only the ":" keywords into a json object

       // chain function
        events = _.chain(req.body).map(({ email, url }) => {
            const match = p.test(new URL(url).pathname); //extracting url from req.body
            if (match) {
                return { email, surveyId: match.surveyId, choice: match.choice }
            }
        }).compact() // Removing undifined elements
        .uniqBy('email', 'surveyId') // Removing duplicates of this pair
        .each( ({ surveyId, email, choice}) => { // No need in async await for query to execute since Sendgrid doesnt wait for reply.
            Survey.updateOne({
                _id: surveyId,
                recipients: {
                    $elemMatch: { email: email, responded: false }
                }
            },{
                $inc: { [choice]: 1 },
                $set: { 'recipients.$.responded': true },
                lastResponded: Date.now()
            }).exec();
        })
        .value();


        res.send({}); // Sending an empty object to close request
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });





};