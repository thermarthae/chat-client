export default class sanitizer {
	static number(s: any): number {
		if (typeof s === "number") return s;
		else return undefined;
	}

	static string(s: any): string {
		let el = document.createElement("div");
		el.innerText = el.textContent = s;
		s = el.innerHTML;
		return s;
	}
}
