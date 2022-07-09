---
title: Placeholder
slug: /placeholder
description: placeholder description
---

# Local Docker Deployment

This installation doc will help you start a OpenMetadata standalone instance on your local machine.

## Requirements (OSX and Linux)

Please ensure your host system meets the requirements listed below. Then continue to the Procedure for installing
OpenMetadata.

<Collapse title="OSX and Linux">

### Docker (version 20.10.0 or greater)

[Docker](https://docs.docker.com/get-started/overview/) is an open-source platform for developing, shipping, and running applications. It enables you to separate your
applications from your infrastructure, so you can deliver software quickly using OS-level virtualization. It helps
deliver software in packages called Containers.

To check what version of Docker you have, please use the following command.

```commandline
docker --version
```

If you need to install Docker, please visit [Get Docker](https://docs.docker.com/get-docker/).

<Note>

You must allocate at least 6GB of memory to Docker in order to run OpenMetadata. To change the memory allocation
for Docker, please visit `Preferences -> Resources -> Advanced` in your Docker Desktop.

</Note>

### Docker Compose (version v2.1.1 or greater)

The Docker `compose` package enables you to define and run multi-container Docker applications. The compose command
integrates compose functions into the Docker platform, making them available from the Docker command-line interface (
CLI). The Python packages you will install in the procedure below use compose to deploy OpenMetadata.

- **MacOS X**: Docker on MacOS X ships with compose already available in the Docker CLI.
- **Linux**: To install compose on Linux systems, please visit the Docker CLI command documentation and follow the
  instructions.

To verify that the docker compose command is installed and accessible on your system, run the following command.

```commandline
docker compose version
```

Upon running this command you should see output similar to the following.

```commandline
Docker Compose version v2.1.1
```

### Install Docker Compose Version 2.0.0 on Linux

Follow the instructions [here](https://docs.docker.com/compose/cli-command/#install-on-linux) to install docker compose version 2.0.0

1. Run the following command to download the current stable release of Docker Compose
    ```
    DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}

    mkdir -p $DOCKER_CONFIG/cli-plugins curl
    -SL https://github.com/docker/compose/releases/download/v2.2.3/docker-compose-linux-x86_64 -o
    $DOCKER_CONFIG/cli-plugins/docker-compose
    ```
   This command installs Compose V2 for the active user under $HOME directory. To install Docker Compose for all users
   on your system, replace` ~/.docker/cli-plugins` with `/usr/local/lib/docker/cli-plugins`.
2. Apply executable permissions to the binary
    ```
    chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose 
    ```
3. Test your installation
    ```
    docker compose version
    > Docker Compose version v2.2.3
    ```


</Collapse>

