module.exports = (sequelize, DataTypes) => {
    const Video = sequelize.define('Video', {
        Path: DataTypes.STRING,
        Title: DataTypes.STRING,
        Categories: DataTypes.STRING,
        Description: DataTypes.STRING,
        Thumbnail: DataTypes.STRING,
        Subtitles: DataTypes.STRING,
        Year: DataTypes.INTEGER
    })

    return Video
}