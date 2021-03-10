FROM alpine:latest as packager

RUN apk --no-cache add openjdk11-jdk openjdk11-jmods

ENV JAVA_MINIMAL="/opt/java-minimal"

# build minimal JRE
RUN /usr/lib/jvm/java-11-openjdk/bin/jlink \
    --verbose \
    --add-modules \
        java.base,java.sql,java.naming,java.desktop,java.management,java.security.jgss,java.instrument \
    --compress 2 --strip-debug --no-header-files --no-man-pages \
    --release-info="add:IMPLEMENTOR=radistao:IMPLEMENTOR_VERSION=radistao_JRE" \
    --output "$JAVA_MINIMAL"

FROM alpine:latest

ENV JAVA_HOME=/opt/java-minimal
ENV PATH="$PATH:$JAVA_HOME/bin"

COPY --from=packager "$JAVA_HOME" "$JAVA_HOME"
LABEL maintainer="B2B PORTAL" \
      name="B2B LOG CONFIGURATOR" \
      version=0.0.1

EXPOSE 8055

COPY b2b_utils_log_configurator.jar /

ENTRYPOINT [ "java", "-jar", "b2b_utils_log_configurator.jar" ]
CMD [ "--gate.host=localhost", "--hamster.host=localhost", "--gate.port=8080", "hamster.port=9090" ]

