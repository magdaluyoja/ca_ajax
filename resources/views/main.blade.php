<!DOCTYPE html>
<html>
	<head>
	    @include('partials._head')
		@include('partials._stylesheets')
		@yield('css')
	</head>
	<body>
		@include('partials._header')
		@include('partials._topnav')
		<div class="container">
			@include('messages.errors')
			@include('messages.success')
			@yield('content')
		</div>
		@include('partials._footer')
		@include('partials._javascripts')
		@yield('scripts')
	</body>
</html>