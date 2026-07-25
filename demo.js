/* ==========================================================================
   SafeMatch — prototype walk-through
   Every value below is fabricated. Nothing is captured, read or submitted.
   ========================================================================== */

(function () {
    "use strict";

    var reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* Timings collapse when the visitor asked for less motion. */
    function pace(ms) {
        return reducedMotion ? Math.min(ms, 120) : ms;
    }

    var timers = [];

    function later(fn, ms) {
        timers.push(window.setTimeout(fn, pace(ms)));
    }

    /* ---------------------------------------------------------------------
       Stage navigation
       --------------------------------------------------------------------- */

    var stages = Array.prototype.slice.call(
        document.querySelectorAll(".stage")
    );
    var railItems = Array.prototype.slice.call(
        document.querySelectorAll(".rail__item")
    );

    var current = 0;
    var furthest = 0;

    function paintRail() {
        railItems.forEach(function (item, index) {
            var reachable = index <= furthest;

            item.classList.toggle("is-current", index === current);
            item.classList.toggle("is-done", index < furthest);

            item.style.cursor = reachable ? "pointer" : "default";
            item.setAttribute("aria-current", index === current ? "step" : "false");

            /* A step you can click is a step you can also tab to. */
            if (reachable) {
                item.setAttribute("role", "button");
                item.setAttribute("tabindex", "0");
            } else {
                item.removeAttribute("role");
                item.removeAttribute("tabindex");
            }
        });
    }

    function goTo(index) {
        if (index < 0 || index >= stages.length) {
            return;
        }

        current = index;
        furthest = Math.max(furthest, index);

        stages.forEach(function (stage, i) {
            stage.classList.toggle("is-active", i === index);
        });

        paintRail();

        /* Move the caret to the new step, otherwise a keyboard or screen
           reader user stays parked on a button that just disappeared. */
        var heading = stages[index].querySelector(".stage__title");

        if (heading) {
            heading.setAttribute("tabindex", "-1");
            heading.focus({ preventScroll: true });
        }

        var top = document.querySelector(".workbench").offsetTop - 90;
        window.scrollTo({
            top: top,
            behavior: reducedMotion ? "auto" : "smooth"
        });
    }

    document.addEventListener("click", function (event) {
        if (!event.target.closest) {
            return;
        }

        var next = event.target.closest("[data-next]");

        if (next) {
            goTo(Number(next.getAttribute("data-next")));
        }
    });

    railItems.forEach(function (item, index) {
        item.addEventListener("click", function () {
            if (index <= furthest) {
                goTo(index);
            }
        });

        item.addEventListener("keydown", function (event) {
            if (event.key !== "Enter" && event.key !== " ") {
                return;
            }

            if (index <= furthest) {
                event.preventDefault();
                goTo(index);
            }
        });
    });

    function restart() {
        timers.forEach(window.clearTimeout);
        window.location.replace("demo.html");
    }

    document.getElementById("resetDemo").addEventListener("click", restart);
    document.getElementById("resetDemoEnd").addEventListener("click", restart);

    /* ---------------------------------------------------------------------
       Step 01 — citizen ID
       --------------------------------------------------------------------- */

    var idViewfinder = document.getElementById("idViewfinder");
    var idProgress = document.getElementById("idProgress");
    var idScan = document.getElementById("idScan");

    function setField(name, value) {
        var node = document.querySelector('[data-field="' + name + '"]');

        node.textContent = value;
        node.classList.remove("is-pending");
    }

    function setText(id, value) {
        document.getElementById(id).textContent = value;
    }

    idScan.addEventListener("click", function () {
        idScan.disabled = true;
        idViewfinder.classList.add("is-scanning");

        setText("idStatus", "Reading the front of the card");
        setText("idStep", "1 of 3");
        setText("idSource", "Front image · OCR");
        idProgress.style.width = "18%";

        later(function () {
            setField("name", "NGUYEN THI MAI HUONG");
            setField("id", "0794••••••31");
            idProgress.style.width = "42%";
            setText("idStatus", "Reading the back of the card");
            setText("idStep", "2 of 3");
        }, 900);

        later(function () {
            setField("dob", "14 March 1998");
            setField("issued", "2021-06-02 · Ha Noi");
            idProgress.style.width = "66%";
            setText("idStatus", "Hold the card against the back of the phone");
            setText("idStep", "3 of 3");
            setText("idSource", "Chip · NFC");
        }, 1700);

        later(function () {
            setField("chip", "Valid — SOD signature checked");
            idProgress.style.width = "88%";
            setText("idStatus", "Checking with the issuing authority");
        }, 2500);

        later(function () {
            setField("check", "Current · not reported lost");
            idProgress.style.width = "100%";

            idViewfinder.classList.remove("is-scanning");
            idViewfinder.classList.add("is-done");

            setText("idStatus", "Card read and confirmed");
            setText("idStep", "done");
            setText("idMode", "chip verified");

            idScan.classList.add("is-hidden");
            idScan.nextElementSibling.classList.remove("is-hidden");
        }, 3300);
    });

    /* ---------------------------------------------------------------------
       Step 02 — face match
       --------------------------------------------------------------------- */

    var faceViewfinder = document.getElementById("faceViewfinder");
    var faceCapture = document.getElementById("faceCapture");
    var faceScore = document.getElementById("faceScore");
    var faceFill = document.getElementById("faceFill");

    function countUp(target, done) {
        var value = 0;
        var step = reducedMotion ? target : target / 26;

        var tick = window.setInterval(function () {
            value = Math.min(target, value + step);
            faceScore.textContent = value.toFixed(2);

            if (value >= target) {
                window.clearInterval(tick);
                done();
            }
        }, 34);

        timers.push(tick);
    }

    faceCapture.addEventListener("click", function () {
        faceCapture.disabled = true;
        faceViewfinder.classList.add("is-scanning");

        setText("faceStatus", "Hold still");
        setText("faceStep", "capturing");

        later(function () {
            setText("faceStatus", "Comparing with the chip portrait");
            setText("faceStep", "matching");
        }, 1000);

        later(function () {
            faceViewfinder.classList.remove("is-scanning");
            faceViewfinder.classList.add("is-done");

            setText("faceStatus", "Match above threshold");
            setText("faceStep", "0.94");

            faceFill.style.width = "94%";

            countUp(0.94, function () {
                var outcome = document.getElementById("faceOutcome");

                outcome.textContent = "Above threshold — proceed to liveness";
                outcome.classList.remove("is-pending");

                faceCapture.classList.add("is-hidden");
                faceCapture.nextElementSibling.classList.remove("is-hidden");
            });
        }, 2100);
    });

    /* ---------------------------------------------------------------------
       Step 03 — liveness
       --------------------------------------------------------------------- */

    var livenessViewfinder = document.getElementById("livenessViewfinder");
    var livenessStart = document.getElementById("livenessStart");
    var challenges = Array.prototype.slice.call(
        document.querySelectorAll(".challenge")
    );

    var prompts = [
        "Blink twice",
        "Turn your head slowly to the left",
        "Read aloud: 4 — 1 — 9 — 7"
    ];

    function runChallenge(index) {
        if (index >= challenges.length) {
            livenessViewfinder.classList.remove("is-scanning");
            livenessViewfinder.classList.add("is-done");

            setText("livenessStatus", "Liveness passed");
            setText("livenessStep", "3 of 3");

            livenessStart.classList.add("is-hidden");
            livenessStart.nextElementSibling.classList.remove("is-hidden");
            return;
        }

        var item = challenges[index];

        item.classList.add("is-running");
        item.querySelector(".challenge__state").textContent = "checking";

        setText("livenessStatus", prompts[index]);
        setText("livenessStep", index + 1 + " of 3");

        later(function () {
            item.classList.remove("is-running");
            item.classList.add("is-done");
            item.querySelector(".challenge__state").textContent = "passed";

            setText("livenessCounter", index + 1 + " of 3 passed");

            runChallenge(index + 1);
        }, 1500);
    }

    livenessStart.addEventListener("click", function () {
        livenessStart.disabled = true;
        livenessViewfinder.classList.add("is-scanning");

        runChallenge(0);
    });

    /* ---------------------------------------------------------------------
       Step 05 — risk console
       --------------------------------------------------------------------- */

    var conversation = [
        {
            from: "them",
            time: "20:02",
            text: "Morning. I kept thinking about what you said last night.",
            wait: 500
        },
        {
            from: "me",
            time: "20:03",
            text: "Ha. Which part?",
            wait: 1200
        },
        {
            from: "them",
            time: "20:05",
            text: "About saving for your family. I respect that — my work in Singapore taught me to plan carefully.",
            wait: 1400
        },
        {
            from: "them",
            time: "20:07",
            text: "This app is slow for me. Add me on Telegram and we can talk properly: @hoang_invest",
            wait: 1600,
            risk: 30,
            signal: {
                code: "B.1 · OFF-PLATFORM",
                weight: "+18",
                text: "Pushing the conversation to a channel with no reporting path and no record."
            }
        },
        {
            from: "me",
            time: "20:09",
            text: "Maybe later. I don't really use it.",
            wait: 1400
        },
        {
            from: "them",
            time: "20:16",
            text: "Let me show you my exchange account. Small amounts weekly, 6–8% back. I can guide you step by step.",
            wait: 1600,
            risk: 52,
            signal: {
                code: "B.1 · INVEST-SOLICIT",
                weight: "+22",
                text: "Unsolicited investment offer quoting a guaranteed weekly return."
            }
        },
        {
            from: "them",
            time: "20:18",
            text: "Start with 2,000,000 VND today. The window closes tonight.",
            wait: 1500,
            risk: 78,
            signal: {
                code: "B.1 · URGENCY-MONEY",
                weight: "+26",
                text: "Money request paired with an artificial deadline — the core of the pattern."
            }
        },
        {
            from: "them",
            time: "20:19",
            text: "Send it to VCB 001•••••742 — the account is under my sister's name.",
            wait: 1500,
            risk: 90,
            signal: {
                code: "B.1 · THIRD-PARTY-ACCOUNT",
                weight: "+12",
                text: "Transfer requested to an account held in a different name."
            }
        }
    ];

    var chat = document.getElementById("chat");
    var chatEmpty = document.getElementById("chatEmpty");
    var chatPlay = document.getElementById("chatPlay");
    var chatReport = document.getElementById("chatReport");
    var signals = document.getElementById("signals");
    var signalsEmpty = document.getElementById("signalsEmpty");
    var riskBanner = document.getElementById("riskBanner");
    var riskValue = document.getElementById("riskValue");
    var riskFill = document.getElementById("riskFill");
    var riskTag = document.getElementById("riskTag");

    var levels = [
        { at: 70, label: "Act now", cls: "tag--alert", colour: "var(--alert)" },
        { at: 40, label: "Caution", cls: "tag--warn", colour: "var(--warn)" },
        { at: 0, label: "Low", cls: "tag--ok", colour: "var(--ok)" }
    ];

    function setRisk(score) {
        var level = levels.find(function (entry) {
            return score >= entry.at;
        });

        riskValue.innerHTML = score + " <span>of 100</span>";
        riskValue.style.color = level.colour;

        riskFill.style.width = score + "%";
        riskFill.style.background = level.colour;

        riskTag.className = "tag " + level.cls;
        riskTag.innerHTML = '<span class="tag__dot"></span>' + level.label;
    }

    function addMessage(entry) {
        var node = document.createElement("div");

        node.className = "msg msg--" + entry.from;

        if (entry.signal) {
            node.classList.add("msg--flagged");
        }

        var body = document.createElement("p");
        body.textContent = entry.text;
        node.appendChild(body);

        var meta = document.createElement("p");
        meta.className = "msg__meta";
        meta.textContent = entry.signal
            ? entry.time + " · flagged " + entry.signal.code
            : entry.time;
        node.appendChild(meta);

        chat.appendChild(node);
        chat.scrollTop = chat.scrollHeight;
    }

    function addSignal(signal) {
        signalsEmpty.classList.add("is-hidden");

        var node = document.createElement("li");
        node.className = "signal";

        node.innerHTML =
            '<div class="signal__top">' +
            '<span class="signal__code">' + signal.code + "</span>" +
            '<span class="signal__weight">' + signal.weight + " risk</span>" +
            "</div>" +
            '<p class="signal__text">' + signal.text + "</p>";

        signals.appendChild(node);
        signals.scrollTop = signals.scrollHeight;
    }

    function playConversation(index) {
        if (index >= conversation.length) {
            riskBanner.classList.remove("is-hidden");
            chatReport.classList.remove("is-hidden");

            chatPlay.disabled = false;
            chatPlay.textContent = "Play it again";
            return;
        }

        var entry = conversation[index];

        later(function () {
            addMessage(entry);

            setText("chatCounter", index + 1 + " messages");

            if (entry.signal) {
                addSignal(entry.signal);
            }

            if (entry.risk) {
                setRisk(entry.risk);
            }

            playConversation(index + 1);
        }, entry.wait);
    }

    chatPlay.addEventListener("click", function () {
        chatPlay.disabled = true;

        chat.innerHTML = "";
        signals.innerHTML = "";
        signals.appendChild(signalsEmpty);
        signalsEmpty.classList.remove("is-hidden");

        chatEmpty.remove();
        riskBanner.classList.add("is-hidden");
        chatReport.classList.add("is-hidden");

        setRisk(12);
        setText("chatCounter", "0 messages");

        playConversation(0);
    });

    /* ---------------------------------------------------------------------
       Step 06 — file the case
       --------------------------------------------------------------------- */

    document.getElementById("fileReport").addEventListener("click", function () {
        document.getElementById("reportForm").classList.add("is-hidden");
        document.getElementById("reportResult").classList.remove("is-hidden");

        furthest = stages.length - 1;
        paintRail();
    });

    /* ---------------------------------------------------------------------
       Entry point — honour a deep link such as demo.html#stage-monitor
       --------------------------------------------------------------------- */

    var deepLink = stages.findIndex(function (stage) {
        return "#" + stage.id === window.location.hash;
    });

    if (deepLink > 0) {
        furthest = deepLink;
        goTo(deepLink);
    } else {
        paintRail();
    }
}());
