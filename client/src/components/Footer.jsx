export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-white/60">
      <div className="max-w-6xl mx-auto px-5 py-6 text-sm text-center">
        © {new Date().getFullYear()} BloomCraft — handcrafted garlands
      </div>
    </footer>
  );
}
