const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ["localhost:9092"],
});

const func = async () => {
  const consumer = kafka.consumer({ groupId: "1" });
  await consumer.connect();
  await consumer.subscribe({
    topic: "postgresdb.public.comments",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      });
    },
  });
};

func();
