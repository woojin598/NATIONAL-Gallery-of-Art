From openjdk:11-jdk
WORKDIR /app
COPY build/libs/*.jar app.jar
CMD ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]