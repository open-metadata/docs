---
title: Ldap Authentication
slug: /deployment/security/ldap
---

# Setting up Ldap Authentication

OpenMetadata allows using LDAP for validating email and password authentication.
Once setup successfully, the user should be able to sign in to OpenMetadata using the Ldap credentials.

Below are the required steps to set up the LDAP Authentication:

## Set up Configurations in openmetadata.yaml

### Authentication Configuration

The following configuration controls the auth mechanism for OpenMetadata. Update the mentioned fields as required.

```yaml
authenticationConfiguration:
  provider: ${AUTHENTICATION_PROVIDER:-ldap}
  publicKeyUrls: ${AUTHENTICATION_PUBLIC_KEYS:-[http://localhost:8585/api/v1/system/config/jwks]}
  authority: ${AUTHENTICATION_AUTHORITY:-https://accounts.google.com}
  enableSelfSignup : ${AUTHENTICATION_ENABLE_SELF_SIGNUP:-false}
  ldapConfiguration:
    "host": ${AUTHENTICATION_LDAP_HOST:-localhost}
    "port": ${AUTHENTICATION_LDAP_PORT:-10636}
    "dnAdminPrincipal": ${AUTHENTICATION_LOOKUP_ADMIN_DN:-"cn=admin,dc=example,dc=com"}
    "dnAdminPassword": ${AUTHENTICATION_LOOKUP_ADMIN_PWD:-"secret"}
    "userBaseDN": ${AUTHENTICATION_USER_LOOKUP_BASEDN:-"ou=people,dc=example,dc=com"}
    "mailAttributeName": ${AUTHENTICATION_USER_MAIL_ATTR:-email}
    # Optional
    "maxPoolSize": ${AUTHENTICATION_LDAP_POOL_SIZE:-3}
    "sslEnabled": ${AUTHENTICATION_LDAP_SSL_ENABLED:-true}
    "truststoreConfigType": ${AUTHENTICATION_LDAP_TRUSTSTORE_TYPE:-TrustAll} # {CustomTrustStore, HostName, JVMDefault, TrustAll}
    "trustStoreConfig":
      "examineValidityDates": ${AUTHENTICATION_LDAP_EXAMINE_VALIDITY_DATES:-true}
```

For the LDAP auth we need to set:

OpenMetadata Specific Configuration :
 
- `provider`: ldap
- `publicKeyUrls`: {http|https}://{your_domain}:{port}}/api/v1/system/config/jwks
- `authority`: {your_domain}
- `enableSelfSignup`: This has to be false for Ldap.

<Note>

Mandatory LDAP Specific Configuration:

- `host`: hostName for the Ldap Server (Ex - localhost).
- `port`: port of the Ldap Server to connect to (Ex - 10636).
- `dnAdminPrincipal`: This is the DN Admin Principal(Complete path Example :- cn=admin,dc=example,dc=com ) with a lookup access in the Directory.
- `dnAdminPassword`: Above Admin Principal Password.
- `userBaseDN`: User Base DN(Complete path Example :- ou=people,dc=example,dc=com).

</Note>

Please see the below image for a sample LDAP Configuration in ApacheDS.

<Image src="/images/deployment/security/ldap/Ldap_ScreenShot1.png" alt="apache-ldap"/>

Advanced LDAP Specific Configuration (Optional):

- `maxPoolSize`: Connection Pool Size to use to connect to LDAP Server.
- `sslEnabled`: Set to true if the SSL is enable to connect to LDAP Server.
- `truststoreConfigType`: Truststore type. It is required. Can select from {CustomTrustStore, HostName, JVMDefault, TrustAll}
- `trustStoreConfig`: Config for the selected truststore type. Please check below note for setting this up.

<Note>

Based on the different `truststoreConfigType`, we have following different `trustStoreConfig`.

1. **TrustAll**: Provides an SSL trust manager which will blindly trust any certificate that is presented to it, although it may optionally reject certificates that are expired or not yet valid. It can be convenient for testing purposes, but it is recommended that production environments use trust managers that perform stronger validation.

```yaml
  "truststoreConfigType": ${AUTHENTICATION_LDAP_TRUSTSTORE_TYPE:-TrustAll}
  "trustStoreConfig":
    "examineValidityDates": ${AUTHENTICATION_LDAP_EXAMINE_VALIDITY_DATES:-true}
```

- `examineValidityDates`: Indicates whether to reject certificates if the current time is outside the validity window for the certificate.

2. **JVMDefault**: Provides an implementation of a trust manager that relies on the JVM's default set of trusted issuers.

```yaml
  "truststoreConfigType": ${AUTHENTICATION_LDAP_TRUSTSTORE_TYPE:-CustomTrustStore}
  "trustStoreConfig":
    "verifyHostname": ${AUTHENTICATION_LDAP_SSL_VERIFY_CERT_HOST:-true}
```

- `verifyHostname`: Controls using TrustAllSSLSocketVerifier vs HostNameSSLSocketVerifier. In case the certificate contains cn=hostname of the Ldap Server set it to true.

3. **HostName**: Provides an SSL trust manager that will only accept certificates whose hostname matches an expected value.

```yaml
  "truststoreConfigType": ${AUTHENTICATION_LDAP_TRUSTSTORE_TYPE:-HostName}
  "trustStoreConfig":
    "allowWildCards": ${AUTHENTICATION_LDAP_ALLOW_WILDCARDS:-false}
    "acceptableHostNames": ${AUTHENTICATION_LDAP_ALLOWED_HOSTNAMES:-[localhost]}
```

- `allowWildCards`: Indicates whether to allow wildcard certificates which contain an asterisk as the first component of a CN subject attribute or dNSName subjectAltName extension.
- `acceptableHostNames`: The set of hostnames and/or IP addresses that will be considered acceptable. Only certificates with a CN or subjectAltName value that exactly matches one of these names (ignoring differences in capitalization) will be considered acceptable. It must not be null or empty.

4. **CustomTrustStore**: Use the custom Truststore by providing the below details in the config.

```yaml
  "truststoreConfigType": ${AUTHENTICATION_LDAP_TRUSTSTORE_TYPE:-CustomTrustStore}
  "trustStoreConfig":
    "trustStoreFilePath": ${AUTHENTICATION_LDAP_TRUSTSTORE_PATH:-/Users/parthpanchal/trusted.ks}
    "trustStoreFilePassword": ${AUTHENTICATION_LDAP_KEYSTORE_PASSWORD:-secret}
    "trustStoreFileFormat": ${AUTHENTICATION_LDAP_SSL_KEY_FORMAT:-JKS}
    "verifyHostname": ${AUTHENTICATION_LDAP_SSL_VERIFY_CERT_HOST:-true}
    "examineValidityDates": ${AUTHENTICATION_LDAP_EXAMINE_VALIDITY_DATES:-true}
```

- `trustStoreFilePath`: The path to the trust store file to use. It must not be null.
- `trustStoreFilePassword`: The PIN to use to access the contents of the trust store. It may be null if no PIN is required.
- `trustStoreFileFormat`: The format to use for the trust store. (Example :- JKS, PKCS12).
- `verifyHostname`: Controls using TrustAllSSLSocketVerifier vs HostNameSSLSocketVerifier. In case the certificate contains cn=hostname of the Ldap Server set it to true.
- `examineValidityDates`: Indicates whether to reject certificates if the current time is outside the validity window for the certificate.

</Note>

### Authorizer Configuration

This configuration controls the authorizer for OpenMetadata:

```yaml
authorizerConfiguration:
  adminPrincipals: ${AUTHORIZER_ADMIN_PRINCIPALS:-[admin]}
  principalDomain: ${AUTHORIZER_PRINCIPAL_DOMAIN:-"openmetadata.org"}
```

For the Ldap we need to set:

- `adminPrincipals`: This is the list of admin Principal for the OpenMetadata , if mail in ldap is example@openmetadata.org, then if we want this user to be admin in the OM, we should add 'example', in this list.
- `principalDomain`: Company Domain.

## Metadata Ingestion

For ingesting metadata when LDAP is enabled, it is mandatory to configure the `ingestion-bot` account with the JWT configuration. 
To know how to enable it, you can follow the documentation of [Enable JWT Tokens](/deployment/security/enable-jwt-tokens).
