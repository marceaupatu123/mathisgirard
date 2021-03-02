---
description: J'ai créé et documenté des fonctions rien que pour toi !
---

# Main.js

## Commençons par le commencement, importons main.js !

Un étape tout simple pour bien débuter !

```javascript
const maintools = require("../main")
```

{% hint style="info" %}
A noter que le chemin vers main.js peut changer en fonction de où vous vous trouver dans le code
{% endhint %}

Ensuite utiliser les fonctions !

```javascript
maintools.getMoreUsersFromMention(args[0], message)
```

## Comment je trouve toutes ces supers fonctions ?

Vous les trouverez juste en dessous : 

### .getUserFromMention\(mention, message\)

Cette fonction permet d'avoir un membre par le mention +

| Paramètre | Type | Optionnel | Description |
| :--- | :--- | :--- | :--- |
| mention | [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) | ❌ | Tout ce qui peut permettre d'identifier un membre |
| message | [Message](https://discord.js.org/#/docs/main/stable/class/Message) | ✅ | Un message |

 Returns: [GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember)

### .getMoreUsersFromMention\(mention, message\)

Cette fonction permet d'avoir plusieurs membres par le mention+

| Paramètre | Type | Optionnel | Description |
| :--- | :--- | :--- | :--- |
| mention | [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) | ❌ | Tout ce qui peut permettre d'identifier un membre |
| message | [Message](https://discord.js.org/#/docs/main/stable/class/Message) | ❌ | Un message |

 Returns: [Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array)&lt;[GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember)&gt;

### .getChannelFromMention\(mention\)

Cette fonction permet d'avoir un channel par sa mention

| Paramètre | Type | Optionnel | Description |
| :--- | :--- | :--- | :--- |
| mention | [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) | ❌ | Une mention de channel |

 Returns: [Channel](https://discord.js.org/#/docs/main/stable/class/Channel)

### .getmembersbyroles\(role, message\)

Cette fonction permet d'avoir tout les membres d'un rôle spécifique

| Paramètre | Type | Optionnel | Description |
| :--- | :--- | :--- | :--- |
| role | [Role](https://discord.js.org/#/docs/main/stable/class/Role) | ❌ | Un rôle |
| message | [Message](https://discord.js.org/#/docs/main/stable/class/Message) | ❌ | Un message |

 Returns: [Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array)&lt;[GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember)&gt;

### .mute\(client, message, member\)

Cette fonction permet de mute quelqu'un

| Paramètre | Type | Optionnel | Description |
| :--- | :--- | :--- | :--- |
| client | [Client](https://discord.js.org/#/docs/main/stable/class/Client) | ❌ | Un client discord |
| message | [Message](https://discord.js.org/#/docs/main/stable/class/Message) | ❌ | Un message  |
| member | [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) | ❌ | N'importe quoi qui permet d'identifier un utilisateur |

 Returns: [Role](https://discord.js.org/#/docs/main/stable/class/Role)

### .warn\(client, message, qui, raison, author\)

Cette fonction permet de mute quelqu'un

| Paramètre | Type | Optionnel | Description |
| :--- | :--- | :--- | :--- |
| client | [Client](https://discord.js.org/#/docs/main/stable/class/Client) | ❌ | Un client discord |
| message | [Message](https://discord.js.org/#/docs/main/stable/class/Message) | ❌ | Un message  |
| member | [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) | ❌ | N'importe quoi qui permet d'identifier un utilisateur |
| raison | [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) | ❌ | Une raison de warn |
| author | [Snowflake](https://discord.js.org/#/docs/main/stable/typedef/Snowflake) | ✅ | Un auteur de warn |

 Returns: [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean)

### .banrole\(client, message, member\)

Cette fonction permet de banrole quelqu'un

| Paramètre | Type | Optionnel | Description |
| :--- | :--- | :--- | :--- |
| client | [Client](https://discord.js.org/#/docs/main/stable/class/Client) | ❌ | Un client discord |
| message | [Message](https://discord.js.org/#/docs/main/stable/class/Message) | ❌ | Un message  |
| member | [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) | ❌ | N'importe quoi qui permet d'identifier un utilisateur |

 Returns: [Role](https://discord.js.org/#/docs/main/stable/class/Role)

