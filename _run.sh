PROJECT_SUFFIX=$(head /dev/urandom | tr -dc a-z0-9 | head -c 5)

az group create --name "rg-${PROJECT_SUFFIX}" --location "eastus"

az acr create --resource-group "rg-${PROJECT_SUFFIX}" --name "acr${PROJECT_SUFFIX}" --sku "Basic"

az acr login --name "acr${PROJECT_SUFFIX}"

az aks create --resource-group "rg-${PROJECT_SUFFIX}" --name "aks-${PROJECT_SUFFIX}" --node-count "1" --generate-ssh-keys --attach-acr "acr${PROJECT_SUFFIX}"
