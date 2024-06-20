export const SortPosts = ({selectedSortType, setSelectedSortType}) => {
    const getSelectedSortType = (e) => {
        // 選択した並び替えタイプを取得
        setSelectedSortType(e.target.value);
    }

    return (
        <div className="sort">
            <label htmlFor="sort"></label>
            <select onChange={getSelectedSortType} value={selectedSortType} name="sort" id="sort" className="sort--select">
                <option value="new">新しい順</option>
                <option value="old">古い順</option>
            </select>
        </div>
    )
}