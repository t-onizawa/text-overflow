(function($) {

	/**
	 * CSSで使用しているSP振り分けmedia queries
	 * @const
	 * @type {string}
	 */
	var SP_MEDIA = '(max-width:768px)';

	/**
	 * メディアクエリからSPビューかどうかを返す
	 * @returns {boolean}
	 */
	var isSp = function() {
		return window.matchMedia(SP_MEDIA).matches;
	};

	/**
	 * 文字切り、3点リーダー
	 * @type {TextOverflow}
	 */
	var TextOverflow = (function() {

		/**
		 * @constructor
		 */
		function TextOverflow($_self) {
			this.$_self = $_self;

			this.data = {
				line: $_self.data('textOverflow'),
				lineSp: $_self.data('textOverflowSp')
			};
		}

		// init
		TextOverflow.prototype.init = function() {
			var _self = this,
				$window = $(window),
				timer = false,
				currentWidth = $window.width();

			this.saveData();
			this.cut();

			$window.on('resize', function() {
				if (!isSp() || currentWidth === $window.width()) {
					return;
				}
				currentWidth = $window.width();

				if (timer !== false) {
					clearTimeout(timer);
				}

				timer = setTimeout(function() {
					_self.$_self.html(_self.data.html);

					setTimeout(function() {
						_self.cut();
					}, 0);
				}, 300);
			});
		};

		// データを保存
		TextOverflow.prototype.saveData = function() {
			var outerHeight = this.$_self.outerHeight(),
				fontSize = parseInt(this.$_self.css('fontSize')),
				lineHeight = parseInt(this.$_self.css('lineHeight')) / fontSize,
				height = outerHeight - parseInt(this.$_self.css('paddingTop')) - parseInt(this.$_self.css('paddingTop')),
				html = this.$_self.html().trim(),
				singleHeight = fontSize * lineHeight;

			// 情報を保存
			this.data.height = height;
			this.data.html = html;
			this.data.singleHeight = singleHeight;
			this.data.wantHeight = singleHeight * this.data.line;
			this.data.wantSpHeight = singleHeight * this.data.lineSp;
			this.data.fontSize = fontSize;
			this.data.lineHeight = lineHeight;
			this.data.length = html.length;
		};

		// カット
		TextOverflow.prototype.cut = function() {
			var want, ratio, create;

			this.data.height = this.$_self.height();

			// 設定したい最大高さを決める
			want = !isSp() || !this.data.lineSp ? this.data.wantHeight : this.data.wantSpHeight;

			// 要素の高さが設定したい最大高さ以下だったら処理を抜ける
			if (want >= this.data.height) {
				return;
			}

			// +1行分の高さで比率を設定
			ratio = (want + this.data.singleHeight) / this.data.height;

			// 比率に合わせて一括カット
			create = this.data.html.substr(0, Math.ceil(this.data.length * ratio));

			// 残りを一文字づつカット
			while(this.$_self.height() > want) {
				create = create.substr(0, create.length - 1);
				this.$_self.html(create + "...");
			}
		};

		return TextOverflow;
	})();

	/**
	 * document ready
	 */
	$(function() {
		$('[data-text-overflow]').each(function() {
			var textOverflow =  new TextOverflow($(this));
			textOverflow.init();
		});
	});

})(jQuery);