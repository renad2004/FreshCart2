import useOnline from "../../hooks/useOnline"
  export default function OnLine({ children }) {
  const { online } = useOnline()  

  if (online) {
    return children
  } else {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m3 3 8.735 8.735m0 0a.374.374 0 1 1 .53.53m-.53-.53.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 0 1 0 5.304m2.121-7.425a6.75 6.75 0 0 1 0 9.546m2.121-11.667c3.808 3.807 3.808 9.98 0 13.788m-9.546-4.242a3.733 3.733 0 0 1-1.06-2.122m-1.061 4.243a6.75 6.75 0 0 1-1.625-6.929m-.496 9.05c-3.068-3.067-3.664-7.67-1.79-11.334M12 12h.008v.008H12V12Z" />
</svg>

        <h2 className="text-2xl font-semibold mb-2 text-main">
          You are offline
        </h2>
        <p className="text-gray-500">
          Please check your internet connection and try again.
        </p>
      </div>
    )
  }
}
