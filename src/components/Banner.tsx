
function Banner() {
  return (
        <div className="hidden sm:block h-[75vh] bg-cover bg-center items-end relative"  style={{backgroundImage: `url('https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA')`}}>
            <div className="absolute bottom-0 text-center backdrop-brightness-50 text-md text-neutral-300 py-2 w-full">
                Amazonas
            </div>
        </div>
  )
}

export default Banner;
