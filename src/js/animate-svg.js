// Written by Lucas van Dongen - https://github.com/lavandongen

const animateSVGs = document.querySelectorAll('.animate-svg')

;[...animateSVGs].forEach(svg => {
	const animateSVGInView = () => {
		const svgBound = svg.getBoundingClientRect()
		const transitionTiming = JSON.parse(window.getComputedStyle(svg.querySelector('.animate-svg-child')).getPropertyValue('transition-duration').split('s')[0]) * 1000
		
		if (svgBound.top >= 0 && (svgBound.bottom - (svgBound.height / 2)) <= (window.innerHeight || document.documentElement.clientHeight) && !svg.classList.contains('animate-svg--fired')) {
			let index = 0
			let handledGroups = []
			const animateElements = (element, index) => {
				setTimeout(() => {
					if (!element.classList.contains('animate-svg-child--fired')) {
						if (svg.dataset.animateOpacity === 'true' && element.dataset.animateMaxOpacity !== undefined) {
							element.setAttribute('style', `opacity: ${element.dataset.animateMaxOpacity} !important`)
						}

						element.classList.add('animate-svg-child--fired')
					}
				}, (transitionTiming - 50) * index)
			}
			const children = svg.querySelectorAll('.animate-svg-child')

			;[...children].forEach(child => {
				if (child.dataset.animateGroup) {
					const group = child.dataset.animateGroup

					;[...children].forEach(child => {
						if (child.dataset.animateGroup === group)
						animateElements(child, index)
					})
				}

				animateElements(child, index)

				if (child.dataset.animateGroup && handledGroups.indexOf(child.dataset.animateGroup) !== -1) return
				if (child.dataset.animateGroup) handledGroups.push(child.dataset.animateGroup)
				
				index++
			})

			svg.classList.add('animate-svg--fired')
		}
	}

	document.addEventListener('scroll', animateSVGInView)

	animateSVGInView()
})