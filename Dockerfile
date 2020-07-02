FROM ubuntu:18.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y tzdata \
    && echo "UTC" > /etc/timezone \
    && dpkg-reconfigure -f noninteractive tzdata

RUN apt-get install -y apache2 curl \
    && apt-get -y autoremove \
    && apt-get clean

RUN rm -rf /var/www/*

ADD dist /home/healthid
RUN ln -s /home/healthid /var/www/healthid

WORKDIR /home/healthid

ADD vhost.conf /etc/apache2/sites-available/000-default.conf

RUN ["chown", "-R", "www-data:www-data", "/var/www"]

RUN a2enmod rewrite

ENV APACHE_RUN_DIR /var/www
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2

EXPOSE 80

CMD ["/usr/sbin/apache2", "-D", "FOREGROUND"] 