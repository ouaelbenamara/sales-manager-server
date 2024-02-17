const fs = require('fs')

 const  getItemsPicturesBase65 = (JSON_FILE_PATH,) => {
    if (fs.existsSync(JSON_FILE_PATH)) {
        const data = fs.readFileSync(JSON_FILE_PATH, 'utf-8');
        return base64ItemPictures = JSON.parse(data);
    }
    return false

}

 const addNewPictureBase65 = (JSON_FILE_PATH) => {
    try {
        fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(base64Array));
        
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

module.exports = { getItemsPicturesBase65, addNewPictureBase65 }