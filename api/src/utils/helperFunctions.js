const fs = require('fs')
const path = require('path')
const tempPath = path.join('uploads', 'temp')

const moveToUploads = (images, featured) => {
  fs.readdir(tempPath, (err, files) => {
    files.forEach(async (file) => {
      const currentPath = path.join('uploads', 'temp', file)
      const destinationPath = path.join('uploads', file)
      if (images.includes(file) || file === featured) {
        fs.rename(currentPath, destinationPath, function (err) {
          if (err) {
            throw err
          }
        })
      }
    })
  })
}

exports.moveToUploads = moveToUploads
