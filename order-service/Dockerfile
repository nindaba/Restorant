FROM openjdk:11
#all my services will be in restant folder
COPY . ./restorant/order-service
WORKDIR ./restorant/order-service
EXPOSE 5002
#my computer is slow so instead of compiling the service from the pc and upload the jar,
#the azure container will run it using mvn
CMD ./mvnw spring-boot:run
