PROJECT_SUFFIX=$(head /dev/urandom | tr -dc a-z0-9 | head -c 5)

az group create --name "rg-${PROJECT_SUFFIX}" --location "westus2"

az acr create --resource-group "rg-${PROJECT_SUFFIX}" --name "acr${PROJECT_SUFFIX}" --sku "Basic"

az aks create --resource-group "rg-${PROJECT_SUFFIX}" --name "aks-${PROJECT_SUFFIX}" --node-vm-size "Standard_D4_v5" --node-count "1" --attach-acr "acr${PROJECT_SUFFIX}" --generate-ssh-keys

az acr login --name "acr${PROJECT_SUFFIX}"
