var expect = chai.expect



describe('autocompete', function() {
	var autocompete = new AutoCompete(['grapes', 'grapefruit', 'orange']);
	describe('property',function(){
		it('have add', function(){
			expect(autocompete).to.have.property('add');
		});
		it('have match', function(){
			expect(autocompete).to.have.property('match');
		});
	});
	describe('container',function(){
		it('should not be empty',function(){
			expect(autocompete.container).to.be.not.empty;
		});
		it('should be an array',function(){
			expect(autocompete.container).to.be.instanceof(Array);
		});
	});
	describe('match',function(){
		it('should return a string',function(){
			expect(autocompete.match('asdfa')[0]).to.be.a('string');
		});
		it('must return "orange"',function(){
			var autoComp = new AutoCompete();
			autoComp.container = ['grapes', 'grapefruit', 'orange'];
			expect(autoComp.match('ora')[0]).to.equal('orange');
		});
		it('if nothing is enterd must return ""',function(){
			var autoComp = new AutoCompete();
			autoComp.container = ['grapes', 'grapefruit', 'orange'];
			expect(autoComp.match('')[0]).to.equal('');
		});
		it('returned values must match the param',function(){
			var autoComp = new AutoCompete();
			autoComp.container = ['grapes', 'grapefruit', 'orange'];
			for(var i = 0,l = autoComp.match('ora').length; i < l; i++){
				expect(autoComp.match('ora')[i]).to.match(/^ora/);
			}
		});
		it('must return empty string',function(){
			var autoComp = new AutoCompete();
			autoComp.container = ['grapes', 'grapefruit', 'orange'];
			expect(autoComp.match('adfga')[0]).to.be.empty;
		})
	});
	describe('add',function(){
		it('should appear in container',function(){
			var autoComp = new AutoCompete();
			autoComp.add('bakon');
			expect(autoComp.container).to.include('bakon');
		});
		it('length must be incremented',function(){
			var autoComp = new AutoCompete();
			var oldLen = autoComp.container.length;
			autoComp.add('bakon');
			expect(autoComp.container.length).to.equal(oldLen + 1);
		});
	});
	describe('remove',function(){
		it('should be removed from container',function(){
			var autoComp = new AutoCompete();
			autoComp.remove('bakon');
			expect(autoComp.container).to.not.include('bakon');
		});
	});
	
});