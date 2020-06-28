module.exports = (screenWidth) => {

    if(screenWidth < 600) {
        return { width: '300px', height: '300px', position: 'relative', display: 'inline-block', margin: 'auto' };
    } else if( screenWidth > 600 && screenWidth < 1024) {
        return { width: '300px', height: '300px', position: 'relative', display: 'inline-block', margin: 'auto' };
    } else {
        return { width: '400px', height: '400px', position: 'relative', display: 'inline-block', margin: 'auto' };
    }

}