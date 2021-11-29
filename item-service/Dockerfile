FROM openjdk:11.0.1
RUN apt update & apt install -y maven & mvn install
COPY target/item-service-0.0.1.jar ./restorant
WORKDIR /restorant
EXPOSE 5001
CMD java -jar item-service-0.0.1.jar