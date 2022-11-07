# create indices with mappings
# curl -i -X PUT -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:9200/engagementhiddenobject -d @reqs/mappings/engagementhiddenobject.json
# curl -i -X PUT -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:9200/posts -d @reqs/mappings/posts.json
# curl -i -X PUT -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:9200/postgresdb.public.comments -d @reqs/mappings/comments.json

# curl -i -X PUT -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:9200/postgresdb.public.comments/_mapping -d @reqs/mappings/comments.json
postgresdb.public.comments
# setup connections
curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @reqs/connections/es-sink-users.json
# curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @reqs/connections/es-sink-posts.json
# curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors -d @reqs/connections/es-sink-comments.json
curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @reqs/connections/source.json
    // "transforms.dropPrefix.type": "org.apache.kafka.connect.transforms.RegexRouter",
    // "transforms.dropPrefix.regex": "sqldb.dbo.Posts", 
    // "transforms.dropPrefix.replacement": "posts"


curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @mapping/es-sink-engagement.json
curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @mapping/source.json
curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @mapping/source1.json

es-sink-engagementhiddenobject.json
curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @mapping/es-sink-engagementhiddenobject.json