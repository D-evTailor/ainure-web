# Selference Responsive QA Test Report

**Generated:** 17/2/2026, 14:29:13

**Base URL:** http://localhost:3000

**Test Duration:** 123.90s

## 📊 Summary

- **Total Tests:** 54
- **Passed:** 0 ✅
- **Failed:** 0 ❌
- **Warnings:** 54 ⚠️
- **Success Rate:** 0.0%

## ✅ Horizontal Overflow Check

**CONFIRMED:** No horizontal overflow detected on any route at any breakpoint.

All pages properly contain content within viewport width across all tested breakpoints.

## 🐛 Issues Found

### 🟡 Medium Priority Issues

1. **Homepage** (/)
   - **Viewport:** 320x800
   - **Type:** typography
   - **Description:** Minimum font size (12.0px) is below recommended 14px
   - **Reproduction:** Navigate to / at 320x800 and inspect text elements
   - **Details:** Body font: 16px, Minimum found: 12.0px

2. **Homepage** (/)
   - **Viewport:** 320x800
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to / at 320x800 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

3. **Homepage** (/)
   - **Viewport:** 320x800
   - **Type:** touch-target
   - **Description:** 15 interactive element(s) below 44x44px minimum touch target
   - **Reproduction:** Navigate to / at 320x800 on mobile and try tapping small buttons/links
   - **Details:** Examples: [
  {
    "tag": "A",
    "text": "Saltar al contenido principal",
    "width": 32,
    "height": 16
  },
  {
    "tag": "A",
    "text": "",
    "width": 41,
    "height": 40
  },
  {
    "tag": "BUTTON",
    "text": "Preciso",
    "width": 93,
    "height": 43
  },
  {
    "tag": "A",
    "text": "",
    "width": 33,
    "height": 32
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  }
]

4. **Homepage** (/)
   - **Viewport:** 480x900
   - **Type:** typography
   - **Description:** Minimum font size (12.0px) is below recommended 14px
   - **Reproduction:** Navigate to / at 480x900 and inspect text elements
   - **Details:** Body font: 16px, Minimum found: 12.0px

5. **Homepage** (/)
   - **Viewport:** 480x900
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to / at 480x900 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

6. **Homepage** (/)
   - **Viewport:** 480x900
   - **Type:** touch-target
   - **Description:** 14 interactive element(s) below 44x44px minimum touch target
   - **Reproduction:** Navigate to / at 480x900 on mobile and try tapping small buttons/links
   - **Details:** Examples: [
  {
    "tag": "A",
    "text": "Saltar al contenido principal",
    "width": 32,
    "height": 16
  },
  {
    "tag": "BUTTON",
    "text": "Preciso",
    "width": 93,
    "height": 43
  },
  {
    "tag": "A",
    "text": "",
    "width": 33,
    "height": 32
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  }
]

7. **Homepage** (/)
   - **Viewport:** 768x1024
   - **Type:** typography
   - **Description:** Minimum font size (12.0px) is below recommended 14px
   - **Reproduction:** Navigate to / at 768x1024 and inspect text elements
   - **Details:** Body font: 16px, Minimum found: 12.0px

8. **Homepage** (/)
   - **Viewport:** 768x1024
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to / at 768x1024 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

9. **Homepage** (/)
   - **Viewport:** 1024x768
   - **Type:** typography
   - **Description:** Minimum font size (12.0px) is below recommended 14px
   - **Reproduction:** Navigate to / at 1024x768 and inspect text elements
   - **Details:** Body font: 16px, Minimum found: 12.0px

10. **Homepage** (/)
   - **Viewport:** 1024x768
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to / at 1024x768 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

11. **Homepage** (/)
   - **Viewport:** 1280x800
   - **Type:** typography
   - **Description:** Minimum font size (12.0px) is below recommended 14px
   - **Reproduction:** Navigate to / at 1280x800 and inspect text elements
   - **Details:** Body font: 16px, Minimum found: 12.0px

12. **Homepage** (/)
   - **Viewport:** 1280x800
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to / at 1280x800 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

13. **Homepage** (/)
   - **Viewport:** 1536x960
   - **Type:** typography
   - **Description:** Minimum font size (12.0px) is below recommended 14px
   - **Reproduction:** Navigate to / at 1536x960 and inspect text elements
   - **Details:** Body font: 16px, Minimum found: 12.0px

14. **Homepage** (/)
   - **Viewport:** 1536x960
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to / at 1536x960 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

15. **Servicios** (/servicios)
   - **Viewport:** 320x800
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /servicios at 320x800 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

16. **Servicios** (/servicios)
   - **Viewport:** 320x800
   - **Type:** touch-target
   - **Description:** 14 interactive element(s) below 44x44px minimum touch target
   - **Reproduction:** Navigate to /servicios at 320x800 on mobile and try tapping small buttons/links
   - **Details:** Examples: [
  {
    "tag": "A",
    "text": "Saltar al contenido principal",
    "width": 32,
    "height": 16
  },
  {
    "tag": "A",
    "text": "",
    "width": 41,
    "height": 40
  },
  {
    "tag": "A",
    "text": "",
    "width": 33,
    "height": 32
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  }
]

17. **Servicios** (/servicios)
   - **Viewport:** 480x900
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /servicios at 480x900 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

18. **Servicios** (/servicios)
   - **Viewport:** 480x900
   - **Type:** touch-target
   - **Description:** 13 interactive element(s) below 44x44px minimum touch target
   - **Reproduction:** Navigate to /servicios at 480x900 on mobile and try tapping small buttons/links
   - **Details:** Examples: [
  {
    "tag": "A",
    "text": "Saltar al contenido principal",
    "width": 32,
    "height": 16
  },
  {
    "tag": "A",
    "text": "",
    "width": 33,
    "height": 32
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  }
]

19. **Servicios** (/servicios)
   - **Viewport:** 768x1024
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /servicios at 768x1024 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

20. **Servicios** (/servicios)
   - **Viewport:** 1024x768
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /servicios at 1024x768 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

21. **Servicios** (/servicios)
   - **Viewport:** 1280x800
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /servicios at 1280x800 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

22. **Servicios** (/servicios)
   - **Viewport:** 1536x960
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /servicios at 1536x960 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

23. **Metodología** (/metodologia)
   - **Viewport:** 320x800
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /metodologia at 320x800 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

24. **Metodología** (/metodologia)
   - **Viewport:** 320x800
   - **Type:** touch-target
   - **Description:** 14 interactive element(s) below 44x44px minimum touch target
   - **Reproduction:** Navigate to /metodologia at 320x800 on mobile and try tapping small buttons/links
   - **Details:** Examples: [
  {
    "tag": "A",
    "text": "Saltar al contenido principal",
    "width": 32,
    "height": 16
  },
  {
    "tag": "A",
    "text": "",
    "width": 41,
    "height": 40
  },
  {
    "tag": "A",
    "text": "",
    "width": 33,
    "height": 32
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  }
]

25. **Metodología** (/metodologia)
   - **Viewport:** 480x900
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /metodologia at 480x900 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

26. **Metodología** (/metodologia)
   - **Viewport:** 480x900
   - **Type:** touch-target
   - **Description:** 13 interactive element(s) below 44x44px minimum touch target
   - **Reproduction:** Navigate to /metodologia at 480x900 on mobile and try tapping small buttons/links
   - **Details:** Examples: [
  {
    "tag": "A",
    "text": "Saltar al contenido principal",
    "width": 32,
    "height": 16
  },
  {
    "tag": "A",
    "text": "",
    "width": 33,
    "height": 32
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  }
]

27. **Metodología** (/metodologia)
   - **Viewport:** 768x1024
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /metodologia at 768x1024 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

28. **Metodología** (/metodologia)
   - **Viewport:** 1024x768
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /metodologia at 1024x768 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

29. **Metodología** (/metodologia)
   - **Viewport:** 1280x800
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /metodologia at 1280x800 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

30. **Metodología** (/metodologia)
   - **Viewport:** 1536x960
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /metodologia at 1536x960 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

31. **Valores** (/valores)
   - **Viewport:** 320x800
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /valores at 320x800 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

32. **Valores** (/valores)
   - **Viewport:** 320x800
   - **Type:** touch-target
   - **Description:** 14 interactive element(s) below 44x44px minimum touch target
   - **Reproduction:** Navigate to /valores at 320x800 on mobile and try tapping small buttons/links
   - **Details:** Examples: [
  {
    "tag": "A",
    "text": "Saltar al contenido principal",
    "width": 32,
    "height": 16
  },
  {
    "tag": "A",
    "text": "",
    "width": 41,
    "height": 40
  },
  {
    "tag": "A",
    "text": "",
    "width": 33,
    "height": 32
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  }
]

33. **Valores** (/valores)
   - **Viewport:** 480x900
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /valores at 480x900 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

34. **Valores** (/valores)
   - **Viewport:** 480x900
   - **Type:** touch-target
   - **Description:** 13 interactive element(s) below 44x44px minimum touch target
   - **Reproduction:** Navigate to /valores at 480x900 on mobile and try tapping small buttons/links
   - **Details:** Examples: [
  {
    "tag": "A",
    "text": "Saltar al contenido principal",
    "width": 32,
    "height": 16
  },
  {
    "tag": "A",
    "text": "",
    "width": 33,
    "height": 32
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  }
]

35. **Valores** (/valores)
   - **Viewport:** 768x1024
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /valores at 768x1024 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

36. **Valores** (/valores)
   - **Viewport:** 1024x768
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /valores at 1024x768 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

37. **Valores** (/valores)
   - **Viewport:** 1280x800
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /valores at 1280x800 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

38. **Valores** (/valores)
   - **Viewport:** 1536x960
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /valores at 1536x960 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

39. **Contacto** (/contacto)
   - **Viewport:** 320x800
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /contacto at 320x800 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

40. **Contacto** (/contacto)
   - **Viewport:** 320x800
   - **Type:** touch-target
   - **Description:** 19 interactive element(s) below 44x44px minimum touch target
   - **Reproduction:** Navigate to /contacto at 320x800 on mobile and try tapping small buttons/links
   - **Details:** Examples: [
  {
    "tag": "A",
    "text": "Saltar al contenido principal",
    "width": 32,
    "height": 16
  },
  {
    "tag": "A",
    "text": "",
    "width": 41,
    "height": 40
  },
  {
    "tag": "INPUT",
    "text": "",
    "width": 238,
    "height": 40
  },
  {
    "tag": "INPUT",
    "text": "",
    "width": 238,
    "height": 40
  },
  {
    "tag": "INPUT",
    "text": "",
    "width": 238,
    "height": 40
  }
]

41. **Contacto** (/contacto)
   - **Viewport:** 480x900
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /contacto at 480x900 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

42. **Contacto** (/contacto)
   - **Viewport:** 480x900
   - **Type:** touch-target
   - **Description:** 18 interactive element(s) below 44x44px minimum touch target
   - **Reproduction:** Navigate to /contacto at 480x900 on mobile and try tapping small buttons/links
   - **Details:** Examples: [
  {
    "tag": "A",
    "text": "Saltar al contenido principal",
    "width": 32,
    "height": 16
  },
  {
    "tag": "INPUT",
    "text": "",
    "width": 390,
    "height": 40
  },
  {
    "tag": "INPUT",
    "text": "",
    "width": 390,
    "height": 40
  },
  {
    "tag": "INPUT",
    "text": "",
    "width": 390,
    "height": 40
  },
  {
    "tag": "BUTTON",
    "text": "Selecciona un servicio",
    "width": 390,
    "height": 40
  }
]

43. **Contacto** (/contacto)
   - **Viewport:** 768x1024
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /contacto at 768x1024 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

44. **Contacto** (/contacto)
   - **Viewport:** 1024x768
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /contacto at 1024x768 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

45. **Contacto** (/contacto)
   - **Viewport:** 1280x800
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /contacto at 1280x800 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

46. **Contacto** (/contacto)
   - **Viewport:** 1536x960
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /contacto at 1536x960 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

47. **Talks** (/talks)
   - **Viewport:** 320x800
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /talks at 320x800 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

48. **Talks** (/talks)
   - **Viewport:** 320x800
   - **Type:** touch-target
   - **Description:** 19 interactive element(s) below 44x44px minimum touch target
   - **Reproduction:** Navigate to /talks at 320x800 on mobile and try tapping small buttons/links
   - **Details:** Examples: [
  {
    "tag": "A",
    "text": "Saltar al contenido principal",
    "width": 32,
    "height": 16
  },
  {
    "tag": "A",
    "text": "",
    "width": 41,
    "height": 40
  },
  {
    "tag": "BUTTON",
    "text": "Abrir ",
    "width": 59,
    "height": 20
  },
  {
    "tag": "A",
    "text": "Abrir →",
    "width": 48,
    "height": 20
  },
  {
    "tag": "BUTTON",
    "text": "Abrir ",
    "width": 59,
    "height": 20
  }
]

49. **Talks** (/talks)
   - **Viewport:** 480x900
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /talks at 480x900 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

50. **Talks** (/talks)
   - **Viewport:** 480x900
   - **Type:** touch-target
   - **Description:** 18 interactive element(s) below 44x44px minimum touch target
   - **Reproduction:** Navigate to /talks at 480x900 on mobile and try tapping small buttons/links
   - **Details:** Examples: [
  {
    "tag": "A",
    "text": "Saltar al contenido principal",
    "width": 32,
    "height": 16
  },
  {
    "tag": "BUTTON",
    "text": "Abrir ",
    "width": 59,
    "height": 20
  },
  {
    "tag": "A",
    "text": "Abrir →",
    "width": 48,
    "height": 20
  },
  {
    "tag": "BUTTON",
    "text": "Abrir ",
    "width": 59,
    "height": 20
  },
  {
    "tag": "BUTTON",
    "text": "Abrir ",
    "width": 59,
    "height": 20
  }
]

51. **Talks** (/talks)
   - **Viewport:** 768x1024
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /talks at 768x1024 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

52. **Talks** (/talks)
   - **Viewport:** 1024x768
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /talks at 1024x768 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

53. **Talks** (/talks)
   - **Viewport:** 1280x800
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /talks at 1280x800 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

54. **Talks** (/talks)
   - **Viewport:** 1536x960
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /talks at 1536x960 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

55. **Chatbot** (/chatbot)
   - **Viewport:** 320x800
   - **Type:** typography
   - **Description:** Minimum font size (12.0px) is below recommended 14px
   - **Reproduction:** Navigate to /chatbot at 320x800 and inspect text elements
   - **Details:** Body font: 16px, Minimum found: 12.0px

56. **Chatbot** (/chatbot)
   - **Viewport:** 320x800
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /chatbot at 320x800 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

57. **Chatbot** (/chatbot)
   - **Viewport:** 320x800
   - **Type:** touch-target
   - **Description:** 15 interactive element(s) below 44x44px minimum touch target
   - **Reproduction:** Navigate to /chatbot at 320x800 on mobile and try tapping small buttons/links
   - **Details:** Examples: [
  {
    "tag": "A",
    "text": "Saltar al contenido principal",
    "width": 32,
    "height": 16
  },
  {
    "tag": "A",
    "text": "",
    "width": 41,
    "height": 40
  },
  {
    "tag": "BUTTON",
    "text": "",
    "width": 254,
    "height": 40
  },
  {
    "tag": "A",
    "text": "",
    "width": 33,
    "height": 32
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  }
]

58. **Chatbot** (/chatbot)
   - **Viewport:** 480x900
   - **Type:** typography
   - **Description:** Minimum font size (12.0px) is below recommended 14px
   - **Reproduction:** Navigate to /chatbot at 480x900 and inspect text elements
   - **Details:** Body font: 16px, Minimum found: 12.0px

59. **Chatbot** (/chatbot)
   - **Viewport:** 480x900
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /chatbot at 480x900 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

60. **Chatbot** (/chatbot)
   - **Viewport:** 480x900
   - **Type:** touch-target
   - **Description:** 14 interactive element(s) below 44x44px minimum touch target
   - **Reproduction:** Navigate to /chatbot at 480x900 on mobile and try tapping small buttons/links
   - **Details:** Examples: [
  {
    "tag": "A",
    "text": "Saltar al contenido principal",
    "width": 32,
    "height": 16
  },
  {
    "tag": "BUTTON",
    "text": "",
    "width": 64,
    "height": 40
  },
  {
    "tag": "A",
    "text": "",
    "width": 33,
    "height": 32
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  }
]

61. **Chatbot** (/chatbot)
   - **Viewport:** 768x1024
   - **Type:** typography
   - **Description:** Minimum font size (12.0px) is below recommended 14px
   - **Reproduction:** Navigate to /chatbot at 768x1024 and inspect text elements
   - **Details:** Body font: 16px, Minimum found: 12.0px

62. **Chatbot** (/chatbot)
   - **Viewport:** 768x1024
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /chatbot at 768x1024 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

63. **Chatbot** (/chatbot)
   - **Viewport:** 1024x768
   - **Type:** typography
   - **Description:** Minimum font size (12.0px) is below recommended 14px
   - **Reproduction:** Navigate to /chatbot at 1024x768 and inspect text elements
   - **Details:** Body font: 16px, Minimum found: 12.0px

64. **Chatbot** (/chatbot)
   - **Viewport:** 1024x768
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /chatbot at 1024x768 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

65. **Chatbot** (/chatbot)
   - **Viewport:** 1280x800
   - **Type:** typography
   - **Description:** Minimum font size (12.0px) is below recommended 14px
   - **Reproduction:** Navigate to /chatbot at 1280x800 and inspect text elements
   - **Details:** Body font: 16px, Minimum found: 12.0px

66. **Chatbot** (/chatbot)
   - **Viewport:** 1280x800
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /chatbot at 1280x800 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

67. **Chatbot** (/chatbot)
   - **Viewport:** 1536x960
   - **Type:** typography
   - **Description:** Minimum font size (12.0px) is below recommended 14px
   - **Reproduction:** Navigate to /chatbot at 1536x960 and inspect text elements
   - **Details:** Body font: 16px, Minimum found: 12.0px

68. **Chatbot** (/chatbot)
   - **Viewport:** 1536x960
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /chatbot at 1536x960 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

69. **Cuestionario Hematología** (/talks/cuestionario/hematologia)
   - **Viewport:** 320x800
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /talks/cuestionario/hematologia at 320x800 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

70. **Cuestionario Hematología** (/talks/cuestionario/hematologia)
   - **Viewport:** 320x800
   - **Type:** touch-target
   - **Description:** 15 interactive element(s) below 44x44px minimum touch target
   - **Reproduction:** Navigate to /talks/cuestionario/hematologia at 320x800 on mobile and try tapping small buttons/links
   - **Details:** Examples: [
  {
    "tag": "A",
    "text": "Saltar al contenido principal",
    "width": 32,
    "height": 16
  },
  {
    "tag": "A",
    "text": "",
    "width": 41,
    "height": 40
  },
  {
    "tag": "A",
    "text": "Volver a TALKS",
    "width": 107,
    "height": 22
  },
  {
    "tag": "A",
    "text": "",
    "width": 33,
    "height": 32
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  }
]

71. **Cuestionario Hematología** (/talks/cuestionario/hematologia)
   - **Viewport:** 480x900
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /talks/cuestionario/hematologia at 480x900 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

72. **Cuestionario Hematología** (/talks/cuestionario/hematologia)
   - **Viewport:** 480x900
   - **Type:** touch-target
   - **Description:** 14 interactive element(s) below 44x44px minimum touch target
   - **Reproduction:** Navigate to /talks/cuestionario/hematologia at 480x900 on mobile and try tapping small buttons/links
   - **Details:** Examples: [
  {
    "tag": "A",
    "text": "Saltar al contenido principal",
    "width": 32,
    "height": 16
  },
  {
    "tag": "A",
    "text": "Volver a TALKS",
    "width": 107,
    "height": 22
  },
  {
    "tag": "A",
    "text": "",
    "width": 33,
    "height": 32
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  },
  {
    "tag": "A",
    "text": "",
    "width": 40,
    "height": 40
  }
]

73. **Cuestionario Hematología** (/talks/cuestionario/hematologia)
   - **Viewport:** 768x1024
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /talks/cuestionario/hematologia at 768x1024 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

74. **Cuestionario Hematología** (/talks/cuestionario/hematologia)
   - **Viewport:** 1024x768
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /talks/cuestionario/hematologia at 1024x768 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

75. **Cuestionario Hematología** (/talks/cuestionario/hematologia)
   - **Viewport:** 1280x800
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /talks/cuestionario/hematologia at 1280x800 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

76. **Cuestionario Hematología** (/talks/cuestionario/hematologia)
   - **Viewport:** 1536x960
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /talks/cuestionario/hematologia at 1536x960 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

77. **Cuestionario Otorrinolaringología** (/talks/cuestionario/otorrinolaringologia)
   - **Viewport:** 320x800
   - **Type:** typography
   - **Description:** Minimum font size (12.0px) is below recommended 14px
   - **Reproduction:** Navigate to /talks/cuestionario/otorrinolaringologia at 320x800 and inspect text elements
   - **Details:** Body font: 16px, Minimum found: 12.0px

78. **Cuestionario Otorrinolaringología** (/talks/cuestionario/otorrinolaringologia)
   - **Viewport:** 320x800
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /talks/cuestionario/otorrinolaringologia at 320x800 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

79. **Cuestionario Otorrinolaringología** (/talks/cuestionario/otorrinolaringologia)
   - **Viewport:** 320x800
   - **Type:** touch-target
   - **Description:** 148 interactive element(s) below 44x44px minimum touch target
   - **Reproduction:** Navigate to /talks/cuestionario/otorrinolaringologia at 320x800 on mobile and try tapping small buttons/links
   - **Details:** Examples: [
  {
    "tag": "A",
    "text": "Saltar al contenido principal",
    "width": 32,
    "height": 16
  },
  {
    "tag": "A",
    "text": "",
    "width": 41,
    "height": 40
  },
  {
    "tag": "A",
    "text": "Volver a TALKS",
    "width": 93,
    "height": 19
  },
  {
    "tag": "BUTTON",
    "text": "",
    "width": 16,
    "height": 16
  },
  {
    "tag": "INPUT",
    "text": "",
    "width": 16,
    "height": 16
  }
]

80. **Cuestionario Otorrinolaringología** (/talks/cuestionario/otorrinolaringologia)
   - **Viewport:** 480x900
   - **Type:** typography
   - **Description:** Minimum font size (12.0px) is below recommended 14px
   - **Reproduction:** Navigate to /talks/cuestionario/otorrinolaringologia at 480x900 and inspect text elements
   - **Details:** Body font: 16px, Minimum found: 12.0px

81. **Cuestionario Otorrinolaringología** (/talks/cuestionario/otorrinolaringologia)
   - **Viewport:** 480x900
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /talks/cuestionario/otorrinolaringologia at 480x900 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

82. **Cuestionario Otorrinolaringología** (/talks/cuestionario/otorrinolaringologia)
   - **Viewport:** 480x900
   - **Type:** touch-target
   - **Description:** 147 interactive element(s) below 44x44px minimum touch target
   - **Reproduction:** Navigate to /talks/cuestionario/otorrinolaringologia at 480x900 on mobile and try tapping small buttons/links
   - **Details:** Examples: [
  {
    "tag": "A",
    "text": "Saltar al contenido principal",
    "width": 32,
    "height": 16
  },
  {
    "tag": "A",
    "text": "Volver a TALKS",
    "width": 93,
    "height": 19
  },
  {
    "tag": "BUTTON",
    "text": "",
    "width": 16,
    "height": 16
  },
  {
    "tag": "INPUT",
    "text": "",
    "width": 16,
    "height": 16
  },
  {
    "tag": "BUTTON",
    "text": "",
    "width": 16,
    "height": 16
  }
]

83. **Cuestionario Otorrinolaringología** (/talks/cuestionario/otorrinolaringologia)
   - **Viewport:** 768x1024
   - **Type:** typography
   - **Description:** Minimum font size (12.0px) is below recommended 14px
   - **Reproduction:** Navigate to /talks/cuestionario/otorrinolaringologia at 768x1024 and inspect text elements
   - **Details:** Body font: 16px, Minimum found: 12.0px

84. **Cuestionario Otorrinolaringología** (/talks/cuestionario/otorrinolaringologia)
   - **Viewport:** 768x1024
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /talks/cuestionario/otorrinolaringologia at 768x1024 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

85. **Cuestionario Otorrinolaringología** (/talks/cuestionario/otorrinolaringologia)
   - **Viewport:** 1024x768
   - **Type:** typography
   - **Description:** Minimum font size (12.0px) is below recommended 14px
   - **Reproduction:** Navigate to /talks/cuestionario/otorrinolaringologia at 1024x768 and inspect text elements
   - **Details:** Body font: 16px, Minimum found: 12.0px

86. **Cuestionario Otorrinolaringología** (/talks/cuestionario/otorrinolaringologia)
   - **Viewport:** 1024x768
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /talks/cuestionario/otorrinolaringologia at 1024x768 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

87. **Cuestionario Otorrinolaringología** (/talks/cuestionario/otorrinolaringologia)
   - **Viewport:** 1280x800
   - **Type:** typography
   - **Description:** Minimum font size (12.0px) is below recommended 14px
   - **Reproduction:** Navigate to /talks/cuestionario/otorrinolaringologia at 1280x800 and inspect text elements
   - **Details:** Body font: 16px, Minimum found: 12.0px

88. **Cuestionario Otorrinolaringología** (/talks/cuestionario/otorrinolaringologia)
   - **Viewport:** 1280x800
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /talks/cuestionario/otorrinolaringologia at 1280x800 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

89. **Cuestionario Otorrinolaringología** (/talks/cuestionario/otorrinolaringologia)
   - **Viewport:** 1536x960
   - **Type:** typography
   - **Description:** Minimum font size (12.0px) is below recommended 14px
   - **Reproduction:** Navigate to /talks/cuestionario/otorrinolaringologia at 1536x960 and inspect text elements
   - **Details:** Body font: 16px, Minimum found: 12.0px

90. **Cuestionario Otorrinolaringología** (/talks/cuestionario/otorrinolaringologia)
   - **Viewport:** 1536x960
   - **Type:** content-clipping
   - **Description:** 1 element(s) may have clipped content
   - **Reproduction:** Navigate to /talks/cuestionario/otorrinolaringologia at 1536x960 and inspect elements with overflow:hidden
   - **Details:** Examples: [
  {
    "tag": "A",
    "class": "sr-only z-[60] rounded-md bg-brand-300 px-4 py-2 font-medium text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
    "scrollHeight": 40,
    "clientHeight": 16
  }
]

## 📋 Detailed Test Results

| Route | Viewport | Size | Status | Issues |
|-------|----------|------|--------|--------|
| Homepage | xs-mobile | 320x800 | ⚠️ WARNING | 3 |
| Homepage | sm-mobile | 480x900 | ⚠️ WARNING | 3 |
| Homepage | md-tablet | 768x1024 | ⚠️ WARNING | 2 |
| Homepage | lg-desktop | 1024x768 | ⚠️ WARNING | 2 |
| Homepage | xl-desktop | 1280x800 | ⚠️ WARNING | 2 |
| Homepage | 2xl-desktop | 1536x960 | ⚠️ WARNING | 2 |
| Servicios | xs-mobile | 320x800 | ⚠️ WARNING | 2 |
| Servicios | sm-mobile | 480x900 | ⚠️ WARNING | 2 |
| Servicios | md-tablet | 768x1024 | ⚠️ WARNING | 1 |
| Servicios | lg-desktop | 1024x768 | ⚠️ WARNING | 1 |
| Servicios | xl-desktop | 1280x800 | ⚠️ WARNING | 1 |
| Servicios | 2xl-desktop | 1536x960 | ⚠️ WARNING | 1 |
| Metodología | xs-mobile | 320x800 | ⚠️ WARNING | 2 |
| Metodología | sm-mobile | 480x900 | ⚠️ WARNING | 2 |
| Metodología | md-tablet | 768x1024 | ⚠️ WARNING | 1 |
| Metodología | lg-desktop | 1024x768 | ⚠️ WARNING | 1 |
| Metodología | xl-desktop | 1280x800 | ⚠️ WARNING | 1 |
| Metodología | 2xl-desktop | 1536x960 | ⚠️ WARNING | 1 |
| Valores | xs-mobile | 320x800 | ⚠️ WARNING | 2 |
| Valores | sm-mobile | 480x900 | ⚠️ WARNING | 2 |
| Valores | md-tablet | 768x1024 | ⚠️ WARNING | 1 |
| Valores | lg-desktop | 1024x768 | ⚠️ WARNING | 1 |
| Valores | xl-desktop | 1280x800 | ⚠️ WARNING | 1 |
| Valores | 2xl-desktop | 1536x960 | ⚠️ WARNING | 1 |
| Contacto | xs-mobile | 320x800 | ⚠️ WARNING | 2 |
| Contacto | sm-mobile | 480x900 | ⚠️ WARNING | 2 |
| Contacto | md-tablet | 768x1024 | ⚠️ WARNING | 1 |
| Contacto | lg-desktop | 1024x768 | ⚠️ WARNING | 1 |
| Contacto | xl-desktop | 1280x800 | ⚠️ WARNING | 1 |
| Contacto | 2xl-desktop | 1536x960 | ⚠️ WARNING | 1 |
| Talks | xs-mobile | 320x800 | ⚠️ WARNING | 2 |
| Talks | sm-mobile | 480x900 | ⚠️ WARNING | 2 |
| Talks | md-tablet | 768x1024 | ⚠️ WARNING | 1 |
| Talks | lg-desktop | 1024x768 | ⚠️ WARNING | 1 |
| Talks | xl-desktop | 1280x800 | ⚠️ WARNING | 1 |
| Talks | 2xl-desktop | 1536x960 | ⚠️ WARNING | 1 |
| Chatbot | xs-mobile | 320x800 | ⚠️ WARNING | 3 |
| Chatbot | sm-mobile | 480x900 | ⚠️ WARNING | 3 |
| Chatbot | md-tablet | 768x1024 | ⚠️ WARNING | 2 |
| Chatbot | lg-desktop | 1024x768 | ⚠️ WARNING | 2 |
| Chatbot | xl-desktop | 1280x800 | ⚠️ WARNING | 2 |
| Chatbot | 2xl-desktop | 1536x960 | ⚠️ WARNING | 2 |
| Cuestionario Hematología | xs-mobile | 320x800 | ⚠️ WARNING | 2 |
| Cuestionario Hematología | sm-mobile | 480x900 | ⚠️ WARNING | 2 |
| Cuestionario Hematología | md-tablet | 768x1024 | ⚠️ WARNING | 1 |
| Cuestionario Hematología | lg-desktop | 1024x768 | ⚠️ WARNING | 1 |
| Cuestionario Hematología | xl-desktop | 1280x800 | ⚠️ WARNING | 1 |
| Cuestionario Hematología | 2xl-desktop | 1536x960 | ⚠️ WARNING | 1 |
| Cuestionario Otorrinolaringología | xs-mobile | 320x800 | ⚠️ WARNING | 3 |
| Cuestionario Otorrinolaringología | sm-mobile | 480x900 | ⚠️ WARNING | 3 |
| Cuestionario Otorrinolaringología | md-tablet | 768x1024 | ⚠️ WARNING | 2 |
| Cuestionario Otorrinolaringología | lg-desktop | 1024x768 | ⚠️ WARNING | 2 |
| Cuestionario Otorrinolaringología | xl-desktop | 1280x800 | ⚠️ WARNING | 2 |
| Cuestionario Otorrinolaringología | 2xl-desktop | 1536x960 | ⚠️ WARNING | 2 |

## 🔍 Check Details

Each test verifies:

1. **Horizontal Overflow:** `document.body.scrollWidth <= window.innerWidth`
2. **Header Visibility:** Header element is visible and accessible
3. **Typography:** Body text font size >= 14px for readability
4. **Content Clipping:** No elements with `overflow: hidden` cutting off content
5. **Layout Wrapping:** Cards, forms, and containers wrap properly
6. **Touch Targets:** Interactive elements meet 44x44px minimum (mobile)
7. **Interactive Elements:** Mobile menu, forms, and inputs function correctly

## 💡 Recommendations

- Increase minimum font sizes using `clamp()` for fluid typography
- Ensure body text is at least 16px on mobile for accessibility
- Increase padding/size of buttons and links to meet 44x44px minimum
- Add more spacing between interactive elements on mobile

## 🧪 Testing Methodology

Tests were performed using Puppeteer with the following approach:

1. Navigate to each route
2. Set viewport to each breakpoint size
3. Wait for page load and hydration
4. Execute responsive checks via browser context
5. Perform interactive tests (mobile menu, forms, inputs)
6. Capture and analyze results

**Breakpoints Tested:**

- Extra Small Mobile (320px): 320x800
- Small Mobile (480px): 480x900
- Tablet Portrait (768px): 768x1024
- Desktop Small (1024px): 1024x768
- Desktop Medium (1280px): 1280x800
- Desktop Large (1536px): 1536x960

