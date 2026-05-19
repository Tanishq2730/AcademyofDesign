export default function WorkCard({ project }) {
  return (
    <div className="work-card group relative h-[450px] rounded-[50px] overflow-hidden cursor-pointer border border-white/10">
      <img 
        src={project.img} 
        alt={project.title} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-full p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
        <p className="text-purple-400 font-medium tracking-widest uppercase text-sm">By {project.student}</p>
      </div>
    </div>
  );
}
