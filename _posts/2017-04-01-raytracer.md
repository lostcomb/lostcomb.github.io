---
category: programming
small_image: raytracer/main.jpg
---
Made as part of a computer graphics course. The features implemented include:

* Monte Carlo global illumination.
* Mirrors / Semi-reflective materials. This is done by constraining the BRDF to a cone around the perfect reflection angle.
* Glass using the fresnel equations.
* A KDTree to store the triangles.
* Depth of field.
* OpenCL (with OpenMP) version which allows it to run accross multiple GPUs. Global illumination was implemented using macro expansion of instruction code.

I worked on this alongside <a href="http://smithy.productions/"> Rory Smith</a>.

![Raytracer]({{ '/assets/images/raytracer/main.jpg' | relative_url }})
