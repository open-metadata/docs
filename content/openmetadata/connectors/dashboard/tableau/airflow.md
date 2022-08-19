---
title: Run Tableau Connector using Airflow SDK
slug: /openmetadata/connectors/dashboard/tableau/airflow
---

<ConnectorIntro connector="Tableau" goal="Airflow"/>

<Requirements />

<PythonMod connector="Tableau" module="tableau" />

<MetadataIngestionServiceDev service="dashboard" connector="Tableau" goal="Airflow"/>

<h4>Source Configuration - Service Connection</h4>

- **hostPort**: URL to the Tableau instance.
- **username**: Specify the User to connect to Tableau. It should have enough privileges to read all the metadata.
- **password**: Password for Tableau.
- **apiVersion**: Tableau API version.
- **siteName**: Tableau Site Name. To be kept empty if you are using the default Tableau site
- **siteUrl**: Tableau Site Url. To be kept empty if you are using the default Tableau site
- **personalAccessTokenName**: Access token. To be used if not logging in with user/password.
- **personalAccessTokenSecret**: Access token Secret. To be used if not logging in with user/password.
- **env**: Tableau Environment.

<MetadataIngestionConfig service="dashboard" connector="Tableau" goal="Airflow" />
