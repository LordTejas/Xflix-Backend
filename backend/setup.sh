# mongoimport --db=xflix --collection=videos --file=data.json
# mongoimport --uri "mongodb+srv://LordTejas:Tejas_5225@xflix-backend.bn8gn1c.mongodb.net/?retryWrites=true&w=majority" --drop --collection videos --file ./data.json
mongoimport --uri "mongodb://ac-mf2g7ri-shard-00-00.bn8gn1c.mongodb.net:27017,ac-mf2g7ri-shard-00-01.bn8gn1c.mongodb.net:27017,ac-mf2g7ri-shard-00-02.bn8gn1c.mongodb.net:27017/xflix?replicaSet=atlas-lpftbu-shard-0" --ssl --authenticationDatabase admin --username LordTejas --password Tejas_5225 --drop --collection videos --file ./data.json

