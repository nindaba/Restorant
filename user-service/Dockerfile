FROM openjdk:11
COPY ./target/user-service-0.0.1.jar ./restorant/user-service-0.0.1.jar
WORKDIR ./restorant
EXPOSE 5000
#my computer is slow so instead of compiling the service from the pc and upload the jar,
#the azure container will run it using mvn
CMD java -jar user-service-0.0.1.jar