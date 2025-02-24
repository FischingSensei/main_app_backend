FROM maven:3.9.9-eclipse-temurin-23

COPY . /app
WORKDIR /app

RUN mvn clean install
CMD ["mvn", "exec:java", "-Dexec.mainClass=com.fishing.sensei.fishingsensei.FishingSenseiApplication"]
