async function saveEntry() {
    const journalText = document.getElementById("journalEntry").value;
    const dateEntry = document.getElementById("dateEntry").value;
    const responseBox = document.getElementById("aiResponse"); 

    if (!journalText || !dateEntry) {
        responseBox.value = "Please enter a date and journal entry!";
        return;
    }

    const entryData = {
        EntryId: new Date().getTime().toString(),
        Date: dateEntry,
        Text: journalText
    };

    try {
        const response = await fetch("API_GATEWAY_INVOKE_URL", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entryData)
        });

        const data = await response.json();
        responseBox.value = data.ai_response || "Entry saved successfully!";
    } catch (error) {
        responseBox.value = "Error saving entry. Please try again.";
    }
}
