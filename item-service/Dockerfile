FROM openjdk:11
#all my services will be in restant folder
COPY ./target/item-service-0.0.1.jar ./restorant/item-service-0.0.1.jar
WORKDIR ./restorant
EXPOSE 5001
#my computer is slow so instead of compiling the service from the pc and upload the jar,
#the azure container will run it using mvn
CMD java -jar item-service-0.0.1.jar