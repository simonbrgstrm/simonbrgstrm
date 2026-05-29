+++
title = "kubectl Cheat Sheet"
description = ""
type = ["posts","post"]
tags = [
    "kubectl",
    "kubernetes",
    "cheatsheet",
]
date = "2026-05-29"
categories = [
    "Development",
    "DevOps",
]
series = [""]
[ author ]
  name = "Simon Bergstrom"
+++
---

`kubectl` commands I use most often.

---

## Setup

```bash
# Show current context and all available contexts
kubectl config current-context
kubectl config get-contexts

# Switch context / namespace
kubectl config use-context <context-name>
kubectl config set-context --current --namespace=<namespace>

# Quick alias (optional)
alias k=kubectl
```

---

## Inspect cluster resources

```bash
# Nodes and namespaces
kubectl get nodes -o wide
kubectl get ns

# Core workload objects
kubectl get pods -A
kubectl get deploy -A
kubectl get svc -A
kubectl get ing -A

# Watch updates
kubectl get pods -n <namespace> -w
```

---

## Deep dive and debugging

```bash
# Describe object details and events
kubectl describe pod <pod-name> -n <namespace>
kubectl describe deploy <deploy-name> -n <namespace>

# Logs
kubectl logs <pod-name> -n <namespace>
kubectl logs -f <pod-name> -n <namespace>
kubectl logs <pod-name> -c <container-name> -n <namespace>

# Open a shell in a container
kubectl exec -it <pod-name> -n <namespace> -- /bin/sh

# List recent namespace events
kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp
```

---

## Apply and rollout

```bash
# Apply manifests
kubectl apply -f <file-or-directory>

# Check rollout
kubectl rollout status deploy/<deploy-name> -n <namespace>
kubectl rollout history deploy/<deploy-name> -n <namespace>

# Restart / undo rollout
kubectl rollout restart deploy/<deploy-name> -n <namespace>
kubectl rollout undo deploy/<deploy-name> -n <namespace>
```

---

## Scale and port-forward

```bash
# Scale deployment
kubectl scale deploy/<deploy-name> --replicas=3 -n <namespace>

# Port-forward service or pod
kubectl port-forward svc/<service-name> 8080:80 -n <namespace>
kubectl port-forward pod/<pod-name> 8080:8080 -n <namespace>
```

---

## Quick cleanup

```bash
# Delete by manifest
kubectl delete -f <file-or-directory>

# Delete a single pod (it will usually be recreated by its controller)
kubectl delete pod <pod-name> -n <namespace>

# Force-delete stuck pod
kubectl delete pod <pod-name> -n <namespace> --force --grace-period=0
```

