mongoimport --db=xflix --collection=videos --file=data.json
mongodump  --archive="xflix.bson" --db=xflix