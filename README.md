# Desafío final del Nivel 1

- Forkeá este repo (y clonalo)
- Revisá los tests
- Agregá tu código y asegurate que los tests pasen
- Creá un PR y envialo en el formulario correspondiente a este desfío)

# Pull de últimos cambios

Para traer los últimos cambios a un repositorio local que es un clone de un fork, lo mejor es agregar este repo como otro **remote** y hacer un pull. Un remote es un repositorio en una ubicación remota (github) contra el cual podemos hacer pull y push.

Para agregar el remoto:

```sh
git remote add apx git@github.com:apx-school/sd-l1-final.git
```

Para chequear que el remoto se agregó correctamente correr:

```sh
git remote -v
```

Esto debería mostrar el nuevo remoto **apx**

```sh
git remote -v

apx	git@github.com:apx-school/sd-l1-final.git (fetch)
apx	git@github.com:apx-school/sd-l1-final.git (push)
```

Ahora si queremos traernos cambios de este remoto hacemos un push pero agregando el remoto explicitamente.

```sh
git pull apx main
```

En vez de origin usamos apx que es nuestro nuevo **remote**. El remote por defecto es **origin**.
