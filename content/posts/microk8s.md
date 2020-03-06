+++
title = "microk8s intro"
description = ""
type = ["posts","post"]
tags = [
    "microk8s",
    "kubernetes",
    "DevOps",
]
date = "2020-03-04"
categories = [
    "Development",
    "DevOps",
]
series = [""]
[ author ]
  name = "Simon Bergstrom"
+++
---
MicroK8s is a CNCF certified upstream Kubernetes deployment that runs entirely on your workstation or edge device. Being a snap it runs all Kubernetes services natively (i.e. no virtual machines) while packing the entire set of libraries and binaries needed. Installation is limited by how fast you can download a couple of hundred megabytes and the removal of MicroK8s leaves nothing behind.

---
### Install
```
snap install microk8s --classic --channel=1.17/stable
```

### Status
```
sudo microk8s.status
```

```
microk8s is running
addons:
cilium: disabled
dashboard: disabled
dns: enabled
fluentd: disabled
gpu: disabled
helm: disabled
ingress: enabled
istio: enabled
jaeger: disabled
knative: disabled
linkerd: disabled
metrics-server: disabled
prometheus: disabled
rbac: disabled
registry: enabled
storage: enabled
```

### Addons

Enable addon
```
sudo microk8s.enable storage dashboard ingress
```
Disable addon
```
sudo microk8s.disable dashboard
```

---

More microk8s to come - istio, knative and openfaas.
