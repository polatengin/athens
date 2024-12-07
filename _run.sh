PROJECT_SUFFIX=$(head /dev/urandom | tr -dc a-z0-9 | head -c 5)

TIMESTAMP=$(date +"%Y%m%d%H%M%S")

az group create --name "rg-${PROJECT_SUFFIX}" --location "westus2"

az acr create --resource-group "rg-${PROJECT_SUFFIX}" --name "acr${PROJECT_SUFFIX}" --sku "Basic"

az aks create --resource-group "rg-${PROJECT_SUFFIX}" --name "aks-${PROJECT_SUFFIX}" --node-vm-size "Standard_D4_v5" --node-count "1" --attach-acr "acr${PROJECT_SUFFIX}" --generate-ssh-keys

az acr build --registry "acr${PROJECT_SUFFIX}" --image "server:${TIMESTAMP}" ./server

az acr build --registry "acr${PROJECT_SUFFIX}" --image "client:${TIMESTAMP}" ./client

ACR_SERVER=$(az acr show --name "acr${PROJECT_SUFFIX}" --query "loginServer" --output "tsv")

az acr login --name "acr${PROJECT_SUFFIX}"

az aks get-credentials --resource-group "rg${PROJECT_SUFFIX}" --name "aks${PROJECT_SUFFIX}"

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml

kubectl apply -f ./iac/ingress.yaml

sed "s/{IMAGE}/${ACR_SERVER}\/server:${TIMESTAMP}/g" ./server/deploy.yml | kubectl apply -f -

sed "s/{IMAGE}/${ACR_SERVER}\/client:${TIMESTAMP}/g" ./client/deploy.yml | kubectl apply -f -
