// Aufruf: node werkzeuge/kontrast.mjs "#fff" "#275895" ...  (Paare: Vordergrund Hintergrund)
const lum = h => { h=h.replace('#',''); if(h.length===3) h=[...h].map(c=>c+c).join('');
  const [r,g,b]=[0,2,4].map(i=>parseInt(h.slice(i,i+2),16)/255).map(c=>c<=0.03928?c/12.92:((c+0.055)/1.055)**2.4);
  return 0.2126*r+0.7152*g+0.0722*b; };
const ratio=(a,b)=>{const [x,y]=[lum(a),lum(b)].sort((p,q)=>q-p);return (x+0.05)/(y+0.05);};
const a=process.argv.slice(2); for(let i=0;i<a.length;i+=2) console.log(`${a[i]} auf ${a[i+1]}: ${ratio(a[i],a[i+1]).toFixed(2)}:1`);
