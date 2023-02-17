hello-world:
	echo: "hello world"

docker-build:
	docker build -t dofuseye-server .

docker-run:
	docker run -d --name dofuseye-server --network host --env-file .env dofuseye-server
