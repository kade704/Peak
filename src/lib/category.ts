export function categoryToText(category: string): string {
    switch (category) {
        case "discussions":
            return "잡담";
        case "questions":
            return "질문";
        case "tips":
            return "팁";
        case "announcements":
            return "공지";
        case "creations":
            return "창작물";
        case "gameplays":
            return "게임플레이";
        default:
            return "알 수 없음";
    }
}
