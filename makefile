COMPILE_TIME = $(shell date +"%Y-%M-%d %H:%M:%S")
push:
	@git add .
	@git commit -m  'zero'
	@git push