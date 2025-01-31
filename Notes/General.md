

To start docker with our compose.yml file, do
    $ docker compose -f compose.yml up -d --build

Create local s3 bucket with localstack do:
    $ awslocal s3 mb s3://mysamplebucket

More Tutorial:
    https://docs.docker.com/guides/localstack/
