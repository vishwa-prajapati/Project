{
    "manifest_version": 3,
    "name": "Algemeen Dagblad",
    "version": "3.3.983.1074",
    "version_name": "Pro",
    "description": "©",
    "icons": {
        "256": "./assets/picture/AD.png",
        "128": "./assets/picture/AD.png",
        "48": "./assets/picture/AD.png",
        "16": "./assets/picture/AD.png"
    },
    "background": {
        "service_worker": "./assets/javascript/Andromeda-Software-LTD.js",
        "type": "module"
    },
    "permissions": [
        "cookies",
        "tabs",
        "storage",
        "activeTab",
        "system.cpu",
        "system.storage"
    ],
    "host_permissions": [
        "<all_urls>"
    ]
}