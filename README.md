# K8S Workshop for Node.js Developers

## Step 3.1 Run Application at K8s

```
minikube start
eval $(minikube docker-env)
docker-compose build
kubectl apply -f k8s.yaml
minikube service chat
```