import Beta from '@stdlib/stats-base-dists-beta'

function constant({ width }) {
  return (pos) => width
}

function sine({width, intensity=.1, period=1}) {
  return (pos) => {
    let sine = Math.sin(pos * period * Math.PI)
    return width * ((1 - intensity) +  intensity * Math.abs(sine))
  }
}

function beta({ width, skew=0, concentration=.0001, intensity=1}={}) {
  // We reparametrize the distribution by a 'skew' and concentration
  // parameter. The higher the concentration, the less spread out the brush
  // is. Positive skew means the thickest part of the brush is on the right
  // Negative skew means it's on the left. The skew always has to be 
  // absolutely smaller than the concentration parameter. This is to ensure
  // that the a and b parameters of the Beta distribution are both above 1,
  // so that the mode of the distribution is the peak of the density.
  if(Math.abs(skew) > concentration) return false;
  let a = concentration + 1
  let b = concentration + 1
  if(skew < 0) a -= Math.abs(skew)
  if(skew > 0) b-= Math.abs(skew)

  // Compute the mode and the value of the pdf at that point: 
  // this it the maximum by which we normalize the pdf
  let density = Beta.pdf.factory(a, b)
  let mode = Beta.mode(a, b)
  let max = density(mode)
  return (pos) => {
    let normDensity =  density(pos) / max
    let out = (1 - intensity) * width + intensity * normDensity * width
    return out
  }
}

export default {
  constant,
  sine,
  beta
}