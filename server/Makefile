hello-world:
	echo: "hello world"

docker-build:
	docker build -t dofuseye-server .

docker-run:
	docker run -d --network host --env-file .env dofuseye-server
