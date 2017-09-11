(function ($) {
    $.bi.queue = {
        _delay: 350,
        _timerId: null,
        _queue: [],
        push: function (params) {
            this._queue.push(params);
            if (this._timerId == null)
                this._startTimer();
        },
        _tryProcess: function () {
            this._clearTimer();

            // Check if anything is animating
            if ($(':animated').length == 0 && this._queue.length > 0)
                $.bi.record(this._queue.shift());

            if (this._queue.length > 0)
                this._startTimer();
        },
        _startTimer: function () {
            this._clearTimer();
            this._timerId = window.setTimeout($.proxy(this._tryProcess, this), this._delay);
        },
        _clearTimer: function () {
            if (this._timerId != null) {
                window.clearTimeout(this._timerId);
                this._timerId = null;
            }
        }
    };
})(jQuery);
