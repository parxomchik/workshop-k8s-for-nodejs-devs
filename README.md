# K8S Workshop for Node.js Developers

TBD

minikube start
eval $(minikube docker-env)
docker-compose build
kubectl apply -f k8s.yaml
minikube service chat