var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function () {
    $messages.mCustomScrollbar();
    setTimeout(function () {
        // Welcome message instead of fake message
        showBotMessage("Hello! I'm a medical assistant. How can I help you today?");
    }, 100);
});

function updateScrollbar() {
    $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        timeout: 0
    });
}

function setDate() {
    d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    let timeString = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
    $('<div class="timestamp">' + timeString + '</div>').appendTo($('.message:last'));
}

function insertMessage() {
    msg = $('.message-input').val();
    if ($.trim(msg) == '') {
        return false;
    }
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    $('.message-input').val(null);
    updateScrollbar();
    
    // Show typing indicator
    showLoading();
    
    // Send message to backend and get response
    $.ajax({
        url: '/get',
        type: 'POST',
        data: {
            msg: msg
        },
        success: function(response) {
            // Remove loading message
            $('.message.loading').remove();
            
            // Display the response from the LLM
            showBotMessage(response);
        },
        error: function(error) {
            // Remove loading message
            $('.message.loading').remove();
            
            // Show error message
            showBotMessage("Sorry, I encountered an error. Please try again.");
            console.error("Error:", error);
        }
    });
}

function showLoading() {
    $('<div class="message loading new"><figure class="avatar"><img src="/static/doctor-icon.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    updateScrollbar();
}

function showBotMessage(message) {
    $('<div class="message new"><figure class="avatar"><img src="/static/doctor-icon.png" /></figure>' + message + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
}

$('.message-submit').click(function () {
    insertMessage();
});

$(window).on('keydown', function (e) {
    if (e.which == 13) {
        insertMessage();
        return false;
    }
})